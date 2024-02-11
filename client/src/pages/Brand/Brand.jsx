import { useDispatch, useSelector } from "react-redux";
import ModalPopup from "../../components/ModalPopup/ModalPopup";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useEffect, useState } from "react";
import useFormFeilds from "../../hooks/useFormFeilds";
import {
  createBrand,
  deleteBrand,
  updateBrand,
  updateBrandStatus,
} from "../../features/product/productApiSlice";
import { createToast } from "../../utils/toast";
import { setMessageEmpty } from "../../features/product/productSlice";
import LoaderLite from "../../components/LoaderLite/LoaderLite";
import DataTable from "react-data-table-component";
import { timeAgo } from "../../helper/helper";
import swal from "sweetalert";

export const Brand = () => {
  // table coloums
  const columns = [
    {
      name: "Brand Logo",
      selector: (row) => (
        <>
          <img
            style={{
              height: "40px",
              width: "50px",
              objectFit: "cover",
              margin: "10px 0",
            }}
            src={row.logo}
            alt=""
          />
        </>
      ),
    },
    {
      name: "Brand Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Brand Slug",
      selector: (row) => row.slug,
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => timeAgo(row.createdAt),
    },
    {
      name: "Status",
      selector: (row) => (
        <td>
          <div className="status-toggle">
            <input
              type="checkbox"
              id="status_1"
              className="check"
              checked={row.status ? true : false}
            />
            <label
              htmlFor="status_1"
              className="checktoggle"
              onClick={() => handleBrandStatus(row.status, row._id)}
            >
              checkbox
            </label>
          </div>
        </td>
      ),
    },
    {
      name: "Actions",
      selector: (row) => (
        <>
          <td className="text-right">
            <button
              className="mr-2 btn btn-sm btn-warning"
              data-toggle="modal"
              data-target="#brandModalEdit"
              onClick={() => handleEditBrand(row._id)}
            >
              <i className="fe fe-edit" aria-hidden="true"></i>
            </button>
            <button
              onClick={() => handleBrandDelete(row._id)}
              className="mr-3 btn btn-sm btn-danger"
            >
              <i className="fe fe-trash" aria-hidden="true"></i>
            </button>
          </td>
        </>
      ),
    },
  ];

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const { error, message, loader, brand } = useSelector(
    (state) => state.product
  );

  const { input, handleInputChange, resetForm, setInput } = useFormFeilds({
    name: "",
  });

  const [logo, setLogo] = useState(null);
  const [logoPrev, setLogoPrev] = useState(null);

  // logo preview
  const handleLogo = (e) => {
    setLogo(e.target.files[0]);
    setLogoPrev(URL.createObjectURL(e.target.files[0]));
  };

  // create brand
  const handleBrandCreate = async (e) => {
    e.preventDefault();
    const form_data = new FormData();

    form_data.append("name", input.name);
    form_data.append("brand-logo", logo);
    dispatch(createBrand(form_data));

    resetForm();
  };

  // edit start here
  const [editId, setEditId] = useState(null);

  // click on edit brand
  const handleEditBrand = (id) => {
    const findedBrand = brand.find((data) => data._id === id);
    setInput({ name: findedBrand.name });
    setLogoPrev(findedBrand.logo);
    setEditId(id);
  };

  // edit form submit
  const handleSubmitEditForm = (e) => {
    e.preventDefault();
    const form_data = new FormData();

    form_data.append("name", input.name);
    if (logo) {
      form_data.append("brand-logo", logo);
    }

    dispatch(updateBrand({ editId, form_data }));

    resetForm();
  };

  // update status
  const handleBrandStatus = (status, id) => {
    dispatch(updateBrandStatus({ status, id }));
  };

  // serach handler
  const [search, setSearch] = useState("");
  const handleSearch = (valus) => {
    setSearch(valus);
  };

  // delete brand
  const handleBrandDelete = (id) => {
    swal({
      title: "Are You Sure?",
      text: "This will delete that brand forever",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Deleted", {
          icon: "success",
        });
        dispatch(deleteBrand(id));
      }
    });
  };

  useEffect(() => {
    if (error) {
      createToast(error, "error");
      dispatch(setMessageEmpty());
    }
    if (message) {
      createToast(message, "success");
      dispatch(setMessageEmpty());
      setLogoPrev(null);
      setLogo(null);
    }
  }, [message, error, dispatch, resetForm]);
  return (
    <>
      <PageTitle title={user?.name} breadcum={"Brand"} />

      <ModalPopup header={"Add new brand"} target="brandModal">
        <form onSubmit={handleBrandCreate}>
          <div className="row form-row">
            <div className="col-12 col-sm-12">
              <div className="form-group">
                <label>
                  <h6>Name</h6>
                </label>
                <input
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              {logo && (
                <div className="form-group">
                  <img style={{ width: "100%" }} src={logoPrev} alt="" />
                </div>
              )}
              <div className="form-group">
                <label>
                  <h6>Logo</h6>
                </label>
                <input
                  onChange={handleLogo}
                  type="file"
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Add Now
          </button>
          {loader && <LoaderLite />}
        </form>
      </ModalPopup>

      <ModalPopup header={"Update brand"} target="brandModalEdit">
        <form onSubmit={handleSubmitEditForm}>
          <div className="row form-row">
            <div className="col-12 col-sm-12">
              <div className="form-group">
                <label>
                  <h6>Name</h6>
                </label>
                <input
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>

              {logoPrev && (
                <div className="form-group">
                  <img style={{ width: "100%" }} src={logoPrev} alt="" />
                </div>
              )}

              <div className="form-group">
                <label>
                  <h6>Logo</h6>
                </label>
                <input
                  onChange={handleLogo}
                  type="file"
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Update Now
          </button>
          {loader && <LoaderLite />}
        </form>
      </ModalPopup>

      <div className="row">
        <div className="col-md-12">
          <button
            className="btn btn-primary mb-4"
            data-target="#brandModal"
            data-toggle="modal"
          >
            Add Brand
          </button>

          <DataTable
            columns={columns}
            className="shadow-sm"
            title="All brands data"
            data={brand ? brand : []}
            selectableRows
            pagination
            highlightOnHover
            subHeader
            subHeaderComponent={
              <input
                type="search"
                placeholder="Search . . ."
                className="form-control w-25"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
              />
            }
          />
        </div>
      </div>
    </>
  );
};
