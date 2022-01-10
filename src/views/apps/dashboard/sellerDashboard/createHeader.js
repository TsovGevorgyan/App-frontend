import { Button } from 'reactstrap';
const CreateHeader = ({ handleSubmit, submit }) => {
  console.log('button page');

  return (
    <div>
      <Button onClick={handleSubmit} color="primary">
        {submit}
      </Button>
    </div>
  );
};

export default CreateHeader;
