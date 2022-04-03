import "./icon.scss";
import * as MuiIcon from "@mui/icons-material";

export default function Icon({ name }: { name: string }) {
  const muiIcon = MuiIcon as any;
  const DynamicIcon = muiIcon[name];
  return <DynamicIcon className="icon" />;
}
