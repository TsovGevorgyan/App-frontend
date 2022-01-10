import Select from 'react-select';
import { useMemo } from 'react';
import { tableRowsOptions } from '../../../utility/constants';

const Header = ({ onPagination, rowPerPage, Button }) => {
  const selectedCount = useMemo(
    () => tableRowsOptions.find((item) => item.value === rowPerPage),
    [rowPerPage]
  );

  const handleOnSelect = (option) => {
    onPagination({ page: 1, rowPerPage: option.value });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'end',
        margin: '38px 0',
      }}
    >
      <div className="header content">
        <Select
          className="header select"
          onChange={handleOnSelect}
          options={tableRowsOptions}
          defaultValue={selectedCount}
        />
        {Button ? <Button /> : ''}
      </div>
    </div>
  );
};

export default Header;
