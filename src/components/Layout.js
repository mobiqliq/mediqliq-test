import React from 'react';
import { Link } from 'react-router-dom';
import { hasRole } from '../utils/permissions';

function Layout({ children }) {

  return (
    <div>

      <nav style={{ marginBottom: 20 }}>

        <Link to="/">Dashboard</Link> |{' '}

        <Link to="/opd">OPD</Link> |{' '}

        <Link to="/pharmacy">Pharmacy</Link> |{' '}

        {hasRole(['SUPER_ADMIN']) && (
          <>
<Link to="/cash-closing">Cash Closing</Link> |{' '}
            <Link to="/expense">Expenses</Link> |{' '}
            <Link to="/finance">Finance Summary</Link> |{' '}
          </>
        )}

      </nav>

      <div>
        {children}
      </div>

    </div>
  );
}

export default Layout;
