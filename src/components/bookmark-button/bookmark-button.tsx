import { MouseEventHandler, memo, useMemo } from 'react';

type BookmarkButtonProps = {
  type: 'offer' | 'place';
  isBookmarked: boolean;
  handleBookmark: MouseEventHandler<HTMLButtonElement>;
}
const mapBookmarkType = {
  offer: {
    className: 'offer__bookmark-button',
    classNameIcon: 'offer__bookmark-icon',
    width: 31,
    height: 33,
  },
  place: {
    className: 'place-card__bookmark-button',
    classNameIcon: 'place-card__bookmark-icon',
    width: 18,
    height: 19,
  }
};

const BookmarkButton = ({ type, isBookmarked, handleBookmark }: BookmarkButtonProps) => {
  const {className, width, height, classNameIcon} = useMemo(() => mapBookmarkType[type], [type]);

  return (
    <button className={`${className} button ${isBookmarked && `${className}--active`}`} type="button" onClick={handleBookmark}>
      <svg className={classNameIcon} width={width} height={height}>
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
};

export default memo(BookmarkButton) as typeof BookmarkButton;
