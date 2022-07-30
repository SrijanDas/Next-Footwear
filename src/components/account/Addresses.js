import React, { memo } from "react";
import Address from "../Address";
// import Address from "../Address";
import Card from "../Card";

function Addresses({ allAddress }) {
  return (
    <Card title="My Addresses">
      <div className="flex flex-col">
        {allAddress?.map((address, indx) => (
          <>
            <Address key={address.id} address={address} />
            {indx !== allAddress.length - 1 && <hr className="my-2" />}
          </>
        ))}
      </div>
    </Card>
  );
}

export default memo(Addresses);
