import { useDispatch, useSelector } from "react-redux";
import ModalPopup from "../../components/ModalPopup/ModalPopup";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useEffect, useState } from "react";
import useFormFeilds from "../../hooks/useFormFeilds";
import {
  createTag,
  deleteTag,
  tagStatusChange,
  updateTag,
} from "../../features/product/productApiSlice";
import { createToast } from "../../utils/toast";
import { setMessageEmpty } from "../../features/product/productSlice";
import DataTable from "react-data-table-component";
import swal from "sweetalert";
import { timeAgo } from "../../helper/helper";

const Tag = () => {
  // tag coloums
  const columns = [
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
              onClick={() => handleTagStatus(row.status, row._id)}
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
              data-target="#tagEditModal"
              onClick={() => handleEditTag(row._id)}
            >
              <i className="fe fe-edit" aria-hidden="true"></i>
            </button>
            <button
              onClick={() => handleTagDelete(row._id)}
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

  const { error, message, tag } = useSelector((state) => state.product);

  const { input, handleInputChange, resetForm, setInput } = useFormFeilds({
    name: "",
  });

  // create tag
  const handleCreateTag = (e) => {
    e.preventDefault();
    dispatch(createTag({ name: input.name }));
    resetForm();
  };

  // edit start here
  const [editID, setEditId] = useState(null);

  const handleEditTag = (id) => {
    const findedTag = tag.find((data) => data._id === id);
    setInput(findedTag)
    setEditId(id)
  };

  // edit tag form submit
  const handleEditTagSubmit = (e) => {
    e.preventDefault()
    dispatch(updateTag({
      id : editID,
      name : input.name
    }))
    resetForm()
  }

  // delete tag
  const handleTagDelete = (id) => {
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
        dispatch(deleteTag(id));
      }
    });
  };

  // tag status change
  const handleTagStatus = (status, id) => {
    dispatch(tagStatusChange({ status, id }));
  };

  useEffect(() => {
    if (tag) {
      if (error) {
        createToast(error, "error");
        dispatch(setMessageEmpty());
      }
      if (message) {
        createToast(message, "success");
        dispatch(setMessageEmpty());
      }
    }
  }, [message, error, dispatch, resetForm, tag]);
  return (
    <>
      <PageTitle title={user?.name} breadcum={"Tag"} />

      <ModalPopup header={"Add new Tag"} target="tagModal">
        <form onSubmit={handleCreateTag}>
          <div className="row form-row">
            <div className="col-12 col-sm-12">
              <div className="form-group">
                <label>
                  <h6>Name</h6>
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Add Now
          </button>
        </form>
      </ModalPopup>

      <ModalPopup header={"Update Tag"} target="tagEditModal">
        <form onSubmit={handleEditTagSubmit}>
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
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Add Now
          </button>
        </form>
      </ModalPopup>

      <div className="row">
        <div className="col-md-12">
          <button
            className="btn btn-primary mb-4"
            data-target="#tagModal"
            data-toggle="modal"
          >
            Add Tag
          </button>

          <DataTable
            className="shadow-sm"
            title="All Tags data"
            columns={columns}
            data={tag ? tag : []}
            selectableRows
            pagination
            highlightOnHover
            subHeader
            subHeaderComponent={
              <input
                type="search"
                placeholder="Search . . ."
                className="form-control w-25"
              />
            }
          />
        </div>
      </div>
    </>
  );
};

export default Tag;
