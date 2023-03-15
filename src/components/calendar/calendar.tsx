import { FC, useEffect, useState } from 'react';
import moment, { Moment } from 'moment';

import { ReactComponent as ArrowSVG } from '../../assets/icon-arrow.svg';
import { dayNames } from '../../constants';
import {
  buildCalender,
  differenceDates,
  getCurrentMonth,
  getCurrentYear,
  getNextMonth,
  getPrevMonth,
} from '../../helpers';

import './calendar.scss';

export const Calendar: FC = () => {
  const [calender, setCalender] = useState<Moment[][]>([]);
  const [value, setValue] = useState<Moment>(moment());

  useEffect(() => {
    setCalender(buildCalender(value));
  }, [value]);

  const nextMonth = () => {
    setValue(getPrevMonth(value));
  };

  const prevMonth = () => {
    setValue(getNextMonth(value));
  };

  return (
    <div className='calendar'>
      <div className='navigation'>
        <p className='body_large'>
          {getCurrentMonth(value)} {getCurrentYear(value)}
        </p>
        <div className='buttons'>
          <button type='button' onClick={nextMonth}>
            <ArrowSVG />
          </button>
          <button className='button_down' type='button' onClick={prevMonth}>
            <ArrowSVG />
          </button>
        </div>
      </div>
      <div className='container'>
        <div className='weekdays'>
          {dayNames.map((weekDay, index) => (
            <div className='day' key={`${index.toString()}`}>
              <p className='info_large'>{weekDay}</p>
            </div>
          ))}
        </div>
        <div className='days'>
          {calender.map((week) => (
            <div key={week.toString()} className='days-div'>
              {week.map((day, index) => (
                <div
                  key={`${index.toString()}`}
                  className={`day ${differenceDates(day) === 1 ? '' : 'day_inactive'} ${
                    index === 5 || index === 6 ? 'holiday' : ''
                  }`}
                >
                  <p className='info_small'>{day.format('D').toString()} </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
