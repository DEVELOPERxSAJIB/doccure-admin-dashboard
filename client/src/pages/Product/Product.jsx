import { useSelector } from "react-redux";
import PageTitle from "../../components/PageTitle/PageTitle";
import DataTable from "react-data-table-component";
import { useState } from "react";
import { timeAgo } from "../../helper/helper";
import { Link } from "react-router-dom";

const Product = () => {
  const cols = [
    {
      name: "Product Image",
      selector: (row) => (
        <img
          style={{ height: "50px", width: "70px", padding: "5px" }}
          src={row.photo}
          alt=""
        />
      ),
    },
    {
      name: "Product Name",
      selector: (row) => row.name,
    },
    {
      name: "Slug",
      selector: (row) => row.slug,
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
            <label htmlFor="status_1" className="checktoggle">
              checkbox
            </label>
          </div>
        </td>
      ),
    },
    {
      name: "Actions",
      selector: (row) => row.action,
    },
  ];
  const { user } = useSelector((state) => state.auth);

  // search state
  const [search, setSearch] = useState("");
  const handleSearch = (valus) => {
    setSearch(valus);
  };

  return (
    <>
      <PageTitle title={user?.name} breadcum={"Product"} />

      <Link to={"/product-create"}>
        <button
          className="btn btn-primary mb-4"
          data-target="#brandModal"
          data-toggle="modal"
        >
          Add Product
        </button>
      </Link>
      <DataTable
        columns={cols}
        className="shadow-sm"
        title="All Products data"
        data={[
          {
            name: "Md SaJib",
            slug: "md-sajib",
            createdAt: "3 min ago",
            status: true,
            photo:
              "https://cdn.shortpixel.ai/spai/q_glossy+w_908+to_webp+ret_img/www.powproductphotography.com/wp-content/uploads/2023/03/HomePage_10.jpg",
            action: (
              <>
                <td className="text-right">
                  <button
                    className="mr-2 btn btn-sm btn-warning"
                    data-toggle="modal"
                    data-target="#brandModalEdit"
                  >
                    <i className="fe fe-edit" aria-hidden="true"></i>
                  </button>
                  <button className="mr-3 btn btn-sm btn-danger">
                    <i className="fe fe-trash" aria-hidden="true"></i>
                  </button>
                </td>
              </>
            ),
          },
        ]}
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

export default Product;
