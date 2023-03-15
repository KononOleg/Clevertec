import { FC, useEffect, useState } from 'react';
import moment, { Moment } from 'moment';

import { ReactComponent as ArrowSVG } from '../../assets/icon-arrow.svg';
import { dayNames, monthNames } from '../../constants';
import {
  buildCalender,
  compareDates,
  getNextMonth,
  getPrevMonth,
  getSecondBookDate,
  isHoliday,
  isToday,
} from '../../helpers';

import './calendar.scss';

export const Calendar: FC = () => {
  const [calender, setCalender] = useState<Moment[][]>([]);
  const [value, setValue] = useState<Moment>(moment());
  const [selectDate, setSelectDate] = useState<Moment | null>(null);

  const secondBookDate = getSecondBookDate(moment());

  useEffect(() => {
    setCalender(buildCalender(value));
  }, [value]);

  const nextMonth = () => setValue(getNextMonth(value));
  const prevMonth = () => setValue(getPrevMonth(value));

  return (
    <div className='calendar'>
      <div className='navigation'>
        <p className='body_large'>
          {monthNames[value.month()]} {value.year()}
        </p>
        <div className='buttons'>
          <button type='button' onClick={prevMonth}>
            <ArrowSVG />
          </button>
          <button className='button_down' type='button' onClick={nextMonth}>
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
                <button
                  key={`${index.toString()}`}
                  type='button'
                  className={`day ${compareDates(secondBookDate, day) || isToday(day) ? '' : 'day_inactive'} ${
                    isHoliday(index) ? 'holiday' : ''
                  } ${isToday(day) ? 'today' : ''} ${selectDate === day ? 'day_select' : ''}`}
                  onClick={() => setSelectDate(day)}
                >
                  <p className='info_small'>{day.format('D').toString()}</p>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
