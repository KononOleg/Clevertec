import { FC, useState } from 'react';

import { ReactComponent as BurgerSVG } from '../../../../assets/icon-burger.svg';
import { ReactComponent as CloseSVG } from '../../../../assets/icon-close.svg';
import { ReactComponent as FilterSVG } from '../../../../assets/icon-filter.svg';
import { ReactComponent as SearchSVG } from '../../../../assets/icon-search.svg';
import { ReactComponent as SquareSVG } from '../../../../assets/icon-square.svg';

import './navigation-list.scss';

interface IProps {
  isTileView: boolean;
  setTileViewHandler: (listView: boolean) => void;
}

export const NavigationList: FC<IProps> = ({ isTileView, setTileViewHandler }) => {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  return (
    <div className='navigation-list'>
      <div className='left'>
        {!isSearchOpen && (
          <button
            className='button_icon search-open'
            type='button'
            onClick={() => setIsSearchOpen(true)}
            data-test-id='button-search-open'
          >
            <SearchSVG />
          </button>
        )}

        <div className={`search ${isSearchOpen ? 'search_active' : ''}`}>
          <button className='button_search' type='button'>
            <SearchSVG />
          </button>
          <input className='input' type='text' placeholder='Поиск книги или автора…' data-test-id='input-search' />
          <button
            className='button_close'
            type='button'
            onClick={() => setIsSearchOpen(false)}
            data-test-id='button-search-close'
          >
            <CloseSVG />
          </button>
        </div>

        {!isSearchOpen && (
          <button className='button_icon' type='button'>
            <FilterSVG />
            <p>По рейтингу</p>
          </button>
        )}
      </div>
      {!isSearchOpen && (
        <div className='buttons'>
          <button
            data-test-id='button-menu-view-window'
            className={`button_icon ${isTileView && 'button_icon_active'}`}
            type='button'
            onClick={() => setTileViewHandler(true)}
          >
            <SquareSVG />
          </button>
          <button
            data-test-id='button-menu-view-list'
            className={`button_icon ${!isTileView && 'button_icon_active'}`}
            type='button'
            onClick={() => setTileViewHandler(false)}
          >
            <BurgerSVG />
          </button>
        </div>
      )}
    </div>
  );
};
