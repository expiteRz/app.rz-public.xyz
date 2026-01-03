// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {assets}
        </head>
        <body class="bg-linear-to-b from-zr-850 to-index-bg text-zr-300 selection:bg-zr-500/50 pt-[5em] font-(--default-font-family) transition duration-250">
          <main id="app">{children}</main>
          {scripts}
        </body>
      </html>
    )}
  />
));
