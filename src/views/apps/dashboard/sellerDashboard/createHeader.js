import { Button } from 'reactstrap';
const CreateHeader = ({ handleModalOpen, buttonName }) => {
  console.log('button page');

  return (
    <div>
      <Button onClick={() => handleModalOpen()} color="primary">
        {buttonName}
      </Button>
    </div>
  );
};

export default CreateHeader;
