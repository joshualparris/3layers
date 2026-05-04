import argparse
import json
import os
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import unquote, urlparse


class SpaRequestHandler(SimpleHTTPRequestHandler):
    local_manifest = {"subapps": {}, "sources": {}}

    def end_headers(self):
        # Prevent stale index/assets cache mismatches after rebuilds.
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def serve_file(self, file_path):
        if not os.path.isfile(file_path):
            self.send_error(404, "File not found")
            return None

        ctype = self.guess_type(file_path)
        try:
            file = open(file_path, "rb")
        except OSError:
            self.send_error(404, "File not found")
            return None

        try:
            stat = os.fstat(file.fileno())
            self.send_response(200)
            self.send_header("Content-type", ctype)
            self.send_header("Content-Length", str(stat.st_size))
            self.send_header("Last-Modified", self.date_time_string(stat.st_mtime))
            self.end_headers()
            return file
        except:
            file.close()
            raise

    def resolve_under_root(self, root, relative_path):
        root = os.path.abspath(root)
        target = os.path.abspath(os.path.join(root, relative_path))
        if os.path.commonpath([root, target]) != root:
            return None
        return target

    def send_head(self):
        request_path = urlparse(self.path).path
        parts = [unquote(part) for part in request_path.strip("/").split("/") if part]

        if len(parts) >= 2 and parts[0] == "source":
            entry = self.local_manifest.get("sources", {}).get(parts[1])
            if not entry:
                self.send_error(404, "Source not found")
                return None
            return self.serve_file(entry["path"])

        if len(parts) >= 2 and parts[0] == "subapp":
            entry = self.local_manifest.get("subapps", {}).get(parts[1])
            if not entry:
                self.send_error(404, "Sub app not found")
                return None

            index_path = os.path.abspath(entry["path"])
            root = os.path.dirname(index_path)
            relative_path = "/".join(parts[2:]) if len(parts) > 2 else os.path.basename(index_path)
            if not relative_path:
                relative_path = os.path.basename(index_path)
            target = self.resolve_under_root(root, relative_path)
            if not target:
                self.send_error(403, "Forbidden")
                return None
            return self.serve_file(target)

        file_path = self.translate_path(request_path)
        basename = os.path.basename(request_path)

        if not os.path.exists(file_path) and "." not in basename:
            self.path = "/index.html"

        return super().send_head()

    def log_message(self, format, *args):
        return


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("directory")
    parser.add_argument("port", type=int)
    parser.add_argument("--manifest", default=None)
    args = parser.parse_args()

    manifest = {"subapps": {}, "sources": {}}
    if args.manifest and os.path.isfile(args.manifest):
      with open(args.manifest, "r", encoding="utf-8") as manifest_file:
          manifest = json.load(manifest_file)

    SpaRequestHandler.local_manifest = manifest

    handler = lambda *handler_args, **handler_kwargs: SpaRequestHandler(
        *handler_args,
        directory=args.directory,
        **handler_kwargs,
    )
    server = ThreadingHTTPServer(("127.0.0.1", args.port), handler)
    print(f"Epic Quest Saga serving {args.directory} at http://127.0.0.1:{args.port}/")
    server.serve_forever()


if __name__ == "__main__":
    main()
