import Button from '../Components/buttons/Button';
import Breadcrumb from '../Components/breadcrumb/Breadcrumb';

const Admin = () => {
  return (
    <main>
      <Breadcrumb tourName={"Panel administrador"} />
      <div className="d-flex justify-content-end container-table">
        <div className="div-table" >
          <div className="row">
            <div className="col">
              <h2>Panel de Administración</h2>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Button url="#" buttonName="Usuarios" />
            </div>
            <div className="col">
              <Button url="/admin/tour" buttonName="Tours"/>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Admin;