import { Button, Input } from 'reactstrap';
import { FiSearch } from 'react-icons/fi';

const Search = ({ fields, setQuery, search }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'start', margin: 10 }}>
      {fields.map(({ placeholder, field, name }) => (
        <Input
          className="search input"
          key={name}
          placeholder={placeholder}
          onBlur={(e) => {
            setQuery((state) => ({ ...state, [field]: e.target.value }));
          }}
        />
      ))}
      <Button color="primary" onClick={() => search()}>
        <FiSearch />
      </Button>
    </div>
  );
};
export default Search;
