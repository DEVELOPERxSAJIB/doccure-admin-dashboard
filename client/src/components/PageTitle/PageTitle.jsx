

const PageTitle = ({ title, breadcum }) => {
  return (
    <div className="page-header">
      <div className="row">
        <div className="col-sm-12">
          <h3 className="page-title">Welcome {title}!</h3>
          <ul className="breadcrumb">
            <li className="breadcrumb-item active">{breadcum}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PageTitle;
