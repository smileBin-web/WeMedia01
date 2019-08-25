import React from 'react';

import { Redirect } from 'dva/router';

export default function () {
  return <Redirect
          to={{
            pathname: "/home"
          }}
        />
}