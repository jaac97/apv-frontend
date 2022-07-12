import React from 'react';
const Alert = (props) => {
    // console.log(Object.values(props.alerts))
/*     console.log(props.alerts.error) */
    return ( 
        <div className={`${props.alerts.error ? 'from-red-400 to-red-600' : 'from-indigo-400 to-indigo-600'} bg-gradient-to-r text-center p-3 rounded-xl uppercase text-white font-bold mb-10`}>
            {/* { Object.values(props.alerts)[0]} */}
            {props.alerts.msg}
        </div>
   );
}
 
export default Alert;