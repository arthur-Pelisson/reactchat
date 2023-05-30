import React, { Fragment, useState } from 'react';
import { socket } from '../socket';
import { Chat } from './MyChat';

export function MyForm({id, histo}) {
  // console.log(id);
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    if (value.trim() === '') return;
    setIsLoading(true);
    setMessage(value);
    // console.log(value, id);
    socket.emit('message', ({value:value, id:id}), () => {
      setIsLoading(false);
    });
    setValue('');
  }

  // if (id === "" || histo === "") {
  //   return (
  //     <Fragment>
  //       <div>
  //         Chargement...
  //       </div>
  //     </Fragment>
  //   )
  // }

  if (id != "" && histo != "") {
    return (
      <Fragment>
       <div>
       <MemoizedChat id={id} message={message}  histo={histo}  />
       </div>
      <form onSubmit={ onSubmit }>
        <input 
          onChange={ (e)=> setValue(e.target.value)}
          value={value}
          disabled={ histo === "" }/>
        <button  type="submit" >Submit</button>
      </form>
      </Fragment>
    );
  }

}  

const MemoizedChat = React.memo(Chat);
