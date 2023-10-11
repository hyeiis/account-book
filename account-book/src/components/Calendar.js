import React, { useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import PrevIcon from "@mui/icons-material/NavigateBefore";
import NextIcon from "@mui/icons-material/NavigateNext";
import "../scss/react-calender.scss";

export default function CalendarCustom() {
  const [date, setDate] = useState(new Date());
  return (
    <Calendar
      onChange={setDate}
      value={date}
      // '일' 문자 없앰
      formatDay={(locale, date) => moment(date).format("D")}
      // 달 이동 버튼 변경
      nextLabel={<NextIcon />}
      prevLabel={<PrevIcon />}
      // 년 이동 버튼 없앰
      next2Label={null}
      prev2Label={null}
    />
  );
}