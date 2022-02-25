import app from "./app";
import logger from "./services/logging";
import open from "open";

const PORT = 8080;
app.listen(PORT, () => {
  logger.info(`✈️  Server Starting at port ${PORT}`);
  setTimeout(() => {
    open(`http://localhost:${PORT}/`);
  }, 1000);
});
