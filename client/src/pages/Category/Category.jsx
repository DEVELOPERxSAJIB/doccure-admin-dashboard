import { useDispatch, useSelector } from "react-redux";
import ModalPopup from "../../components/ModalPopup/ModalPopup";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useEffect, useState } from "react";
import useFormFeilds from "../../hooks/useFormFeilds";
import {
  categoryStatusUpdate,
  createCategory,
  deleteCategory,
  getAllCategory,
} from "../../features/product/productApiSlice";
import { createToast } from "../../utils/toast";
import { setMessageEmpty } from "../../features/product/productSlice";
import LoaderLite from "../../components/LoaderLite/LoaderLite";
import DataTable from "react-data-table-component";
import { timeAgo } from "../../helper/helper";
import swal from "sweetalert";

const Category = () => {
  const columns = [
    {
      name: "Category Photo",
      selector: (row) => (
        <>
          <img
            style={{
              height: "50px",
              width: "60px",
              objectFit: "cover",
              margin: "10px 0",
              borderRadius: "5px",
            }}
            src={row.photo}
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
      name: "Sub Category",
      selector: (row) => (
        <ul>
          {row.subCategory.map((item, index) => {
            return <li key={index}>{item.name}</li>;
          })}
        </ul>
      ),
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
              onClick={() => handleCategoryStatus(row.status, row._id)}
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
              onClick={() => handleDeleteCategory(row._id)}
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

  const { error, message, loader, category } = useSelector(
    (state) => state.product
  );

  const { input, handleInputChange, resetForm, setInput } = useFormFeilds({
    name: "",
    icon: "",
    parent: "",
  });

  const [photo, setPhoto] = useState(null);
  const [photoPrev, setPhotoPrev] = useState(null);

  // photo preview
  const handlePhoto = (e) => {
    setPhoto(e.target.files[0]);
    setPhotoPrev(URL.createObjectURL(e.target.files[0]));
  };

  // create category
  const handleCreateCategory = (e) => {
    e.preventDefault();

    const form_data = new FormData();
    form_data.append("name", input.name);
    form_data.append("icon", input.icon);
    form_data.append("parentCategory", input.parent);
    form_data.append("category-photo", photo);

    if (form_data) {
      dispatch(createCategory(form_data));
    }
  };

  // delete category
  const handleDeleteCategory = (id) => {
    swal({
      title: "Are You Sure?",
      text: "This will delete that Category forever",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Deleted", {
          icon: "success",
        });
        dispatch(deleteCategory(id));
      }
    });
  };

  // change status
  const handleCategoryStatus = (status, id) => {
    dispatch(
      categoryStatusUpdate({
        status,
        id,
      })
    );
  };

  // search
  const [search, setSearch] = useState("");
  const handleSearch = (valus) => {
    setSearch(valus);
  };

  useEffect(() => {
    if (error) {
      createToast(error, "error");
      dispatch(setMessageEmpty());
    }
    if (message) {
      createToast(message, "success");
      dispatch(setMessageEmpty());
      resetForm();
      setPhotoPrev(null);
    }
    dispatch(getAllCategory());
  }, [message, error, dispatch, resetForm, setInput]);

  return (
    <>
      <PageTitle title={user?.name} breadcum={"Brand"} />

      <ModalPopup header={"Add new Category"} target="categoryModal">
        <form onSubmit={handleCreateCategory}>
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
              <div className="form-group">
                <label htmlFor="">
                  <h6>Parent Category</h6>
                </label>
                <select
                  name="parent"
                  value={input.parent}
                  onChange={handleInputChange}
                  id=""
                  className="form-control"
                >
                  <option value="">-select-</option>
                  {category &&
                    category.map((item, index) => {
                      return (
                        <option value={item._id} key={index}>
                          {item.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="">
                  <h6>Icon</h6>
                </label>
                <input
                  name="icon"
                  value={input.icon}
                  onChange={handleInputChange}
                  type="text"
                  className="form-control"
                />
              </div>
              {photoPrev && (
                <div className="form-group">
                  <img style={{ width: "100%" }} src={photoPrev} alt="" />
                </div>
              )}
              <div className="form-group">
                <label>
                  <h6>Photo</h6>
                </label>
                <input
                  type="file"
                  onChange={handlePhoto}
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

      <div className="row">
        <div className="col-md-12">
          <button
            className="btn btn-primary mb-4"
            data-target="#categoryModal"
            data-toggle="modal"
          >
            Add Category
          </button>
        </div>
      </div>

      <DataTable
        columns={columns}
        className="shadow-sm"
        title="All Category"
        data={category ? [...category].reverse() : []}
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
    </>
  );
};

export default Category;
