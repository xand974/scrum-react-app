import "./menu-context.scss";
import Icon from "../Icon/Icon";
type MenuContextType = {
  text: string;
  tag: string;
  icon: string;
  handleClick: (tag: string) => void;
};

export default function MenuContext({
  text,
  tag,
  icon,
  handleClick,
}: MenuContextType) {
  return (
    <div className="menu__context">
      <Icon name={icon} />
      <span className="menu__context__item" onClick={() => handleClick(tag)}>
        {text}
      </span>
    </div>
  );
}
