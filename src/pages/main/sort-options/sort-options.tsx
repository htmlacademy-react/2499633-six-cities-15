type TProps = {
  sortIsOpened: boolean;
  sortVisibilityHandler: () => void;
  sortByHandler: (sortBy:string) => void;
  sortByValues: string[];
  sortBy: string;
}

export const SortOptions = ({sortIsOpened, sortVisibilityHandler, sortByHandler, sortByValues, sortBy}: TProps) => (
  <ul className={sortIsOpened ? 'places__options places__options--custom places__options--opened' : 'places__options places__options--custom'} onClick={sortVisibilityHandler}>
    {sortByValues.map((item) => (
      <li
        className={sortBy === item ? 'places__option places__option--active' : 'places__option'}
        tabIndex={0}
        key={item}
        onClick={()=>(sortByHandler(item))}
      >
        {item}
      </li>

    ))}
  </ul>
);
