import React, { useState } from "react";

const NewArgument = ({ address, argumentsContract }) => {
  const [text, setText] = useState('');
  const submitArgument = async (event) => {
    event.preventDefault();
    const result = await argumentsContract.methods.create(text).send({ from: address });
    console.log(`https://etherscan.io/tx/${result.transactionHash}`);
    setText('')
  } 
  return <div>
    <form onSubmit={submitArgument}>
      <textarea value={text} onChange={(event) => setText(event.target.value)} />
      <br />
      <input type="submit" value="Submit" />
    </form>
  </div>;
}

export default NewArgument;
