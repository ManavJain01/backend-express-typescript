import { dotenv, path, process } from "./imports.helper";

export const loadConfig = () => {
  const env = process.env.NODE_ENV ?? "development";
  const filepath = path.join(process.cwd(), `.env.${env}`);
  dotenv.config({ path: filepath });
};
