
import './DateRangePicker.css';

const DateRangePicker = ({ startDate, endDate, setStartDate, setEndDate }) => {
    return (
        <div className="date-range-picker">
            <h6>Check in:</h6>
            <input 
                type="date" 
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)} 
            />
            <h6>Check out:</h6>
            <input 
                type="date" 
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)} 
            />
        </div>
    );
};

export default DateRangePicker;
