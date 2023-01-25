import React from 'react';

const Iframe = ({ source }) => {

  if (source === undefined || source === "") {
    return <div></div>;
  }

  const src = source;
  return (
    // basic bootstrap classes. you can change with yours.
    <iframe src={src} style={{ width: '100%' }} title='yedpay_Iframe'></iframe>
  );
};

export default Iframe;