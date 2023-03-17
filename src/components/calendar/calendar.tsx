import { ChangeEvent, FC, useEffect, useState } from 'react';
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
  isOneMonth,
  isToday,
  setMonth,
} from '../../helpers';

import './calendar.scss';

interface IProps {
  dateOrder: Moment | null;
  setDateOrder: (dateOrder: Moment) => void;
}

export const Calendar: FC<IProps> = ({ dateOrder, setDateOrder }) => {
  const [calender, setCalender] = useState<Moment[][]>([]);
  const [value, setValue] = useState<Moment>(moment());

  const secondBookDate = getSecondBookDate(moment());

  useEffect(() => {
    setCalender(buildCalender(value));
  }, [value]);

  const nextMonth = () => setValue(getNextMonth(value));
  const prevMonth = () => setValue(getPrevMonth(value));

  const setMonthHandler = (e: ChangeEvent<HTMLSelectElement>) =>
    setValue(setMonth(e.target.value as unknown as number));

  return (
    <div className='calendar' data-test-id='calendar'>
      <div className='navigation'>
        <select
          className='body_large'
          data-test-id='month-select'
          value={(value.format('M') as unknown as number) - 1}
          onChange={setMonthHandler}
        >
          {monthNames.map((monthName, index) => (
            <option value={index} key={`${index.toString()}`}>
              {monthName} {value.year()}
            </option>
          ))}
        </select>
        <div className='buttons'>
          <button type='button' data-test-id='button-prev-month' onClick={prevMonth}>
            <ArrowSVG />
          </button>
          <button className='button_down' data-test-id='button-next-month' type='button' onClick={nextMonth}>
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
                  data-test-id='day-button'
                  type='button'
                  disabled={!isToday(day) && !compareDates(secondBookDate, day)}
                  className={`day info_small ${
                    compareDates(secondBookDate, day) || isToday(day) ? '' : 'day_inactive'
                  } ${isHoliday(index) && isOneMonth(value, day) ? 'holiday' : ''} ${isToday(day) ? 'today' : ''} ${
                    dateOrder && compareDates(dateOrder, day) ? 'day_select' : ''
                  }`}
                  onClick={() => setDateOrder(day)}
                >
                  {day.format('D').toString()}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
