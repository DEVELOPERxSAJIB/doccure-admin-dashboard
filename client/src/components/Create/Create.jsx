import { useSelector } from "react-redux";
import PageTitle from "../PageTitle/PageTitle";
import { Link } from "react-router-dom";
import { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import useFormFeilds from "../../hooks/useFormFeilds";
import "./Create.scss";

const Create = () => {
  const { user } = useSelector((state) => state.auth);
  const { category, brand, tag } = useSelector((state) => state.product);

  const [productType, setProductType] = useState("Simple Product");

  const { input, handleInputChange } = useFormFeilds({
    name: "",
    shortDesc: "",
    longDesc: "",
    brand: "",
    regularPrice: "",
    salePrice: "",
    stock: 0,
    link: null,
  });

  // select category from checkbox
  const [catSelected, setCatSelected] = useState([]);

  const handleCatSelect = (e) => {
    let setCatSelecte = [...catSelected];

    if (catSelected.includes(e.target.value)) {
      setCatSelecte.splice(setCatSelecte.indexOf(e.target.value), 1);
    } else {
      setCatSelecte.push(e.target.value);
    }

    setCatSelected(setCatSelecte);
  };

  // tag select in react select
  const [tags, setTags] = useState();

  const tagOptions = [];
  tag?.map((item) => {
    tagOptions.push({ value: item._id, label: item.name });
  });

  const selectOptAni = makeAnimated();

  return (
    <>
      <PageTitle title={user?.name} breadcum={"Product"} />
      <Link to={"/products"}>
        <button className="btn btn-primary mb-4">All Products</button>
      </Link>

      <div className="row">
        <div className="col-xl-6 d-flex">
          <div className="card flex-fill">
            <div className="card-header">
              <h4 className="card-title">Product Details</h4>
            </div>
            <div className="card-body">
              <form action="#">
                <div className="form-group row">
                  <label className="col-lg-3 col-form-label">Name</label>
                  <div className="col-lg-9">
                    <input
                      type="text"
                      name="name"
                      value={input.name}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-lg-3 col-form-label">Type</label>
                  <div className="col-lg-9">
                    <select
                      className="form-control"
                      onChange={(e) => setProductType(e.target.value)}
                    >
                      <option value="Simple Product">Simple Product</option>
                      <option value="Variable Product">Variable Product</option>
                      <option value="Group Product">Group Product</option>
                      <option value="External Product">External Product</option>
                    </select>
                  </div>
                </div>
                {productType === "Simple Product" && (
                  <>
                    <h5 className="py-2 mb-0 text-light text-center shadow-sm bg-info">
                      Simple Product
                    </h5>
                    <div className="border border-info p-3">
                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label">
                          Regular Price
                        </label>
                        <div className="col-lg-9">
                          <input
                            name="regularPrice"
                            value={input.regularPrice}
                            onChange={handleInputChange}
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label">
                          Sale Price
                        </label>
                        <div className="col-lg-9">
                          <input
                            className="form-control"
                            name="salePrice"
                            value={input.salePrice}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label">Stock</label>
                        <div className="col-lg-9">
                          <input
                            className="form-control"
                            name="stock"
                            value={input.stock}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {productType === "Variable Product" && (
                  <>
                    <h1>Variable Product</h1>
                  </>
                )}

                {productType === "Group Product" && (
                  <>
                    <h1>Group Product</h1>
                  </>
                )}

                {productType === "External Product" && (
                  <>
                    <h5 className="py-2 mb-0 text-light text-center shadow-sm bg-danger">
                      External Product
                    </h5>
                    <div className="border border-danger p-3">
                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label">
                          Regular Price
                        </label>
                        <div className="col-lg-9">
                          <input
                            className="form-control"
                            name="regularPrice"
                            value={input.regularPrice}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label">
                          Sale Price
                        </label>
                        <div className="col-lg-9">
                          <input
                            className="form-control"
                            name="salePrice"
                            value={input.salePrice}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label">Link</label>
                        <div className="col-lg-9">
                          <input
                            className="form-control"
                            name="link"
                            value={input.link}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="form-group row mt-3">
                  <label className="col-lg-3 col-form-label">Short Desc</label>
                  <div className="col-lg-9">
                    <textarea
                      className="form-control"
                      name="shortDesc"
                      value={input.shortDesc}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-lg-3 col-form-label">Long Desc</label>
                  <div className="col-lg-9">
                    <textarea
                      className="form-control"
                      name="longDesc"
                      value={input.longDesc}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="text-right">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-xl-6 d-flex">
          <div className="card flex-fill">
            <div className="card-header">
              <h4 className="card-title">More Details</h4>
            </div>
            <div className="card-body">
              <form action="#">
                <div className="form-group row">
                  <label className="col-lg-3 col-form-label">Photos</label>
                  <div className="col-lg-9">
                    <div className="product-preview">
                      <div className="img-area">
                        <button>
                        <i className="fe fe-trash"></i>
                        </button>
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT76Nm83SBzhCz1muY6ifAGNhlD4i3OHSAhQw&usqp=CAU"
                          alt=""
                        />
                      </div>
                      <div className="img-area">
                        <button>
                        <i className="fe fe-trash"></i>
                        </button>
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT76Nm83SBzhCz1muY6ifAGNhlD4i3OHSAhQw&usqp=CAU"
                          alt=""
                        />
                      </div>
                      <div className="img-area">
                        <button>
                        <i className="fe fe-trash"></i>
                        </button>
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT76Nm83SBzhCz1muY6ifAGNhlD4i3OHSAhQw&usqp=CAU"
                          alt=""
                        />
                      </div>
                      <div className="img-area">
                        <button>
                        <i className="fe fe-trash"></i>
                        </button>
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT76Nm83SBzhCz1muY6ifAGNhlD4i3OHSAhQw&usqp=CAU"
                          alt=""
                        />
                      </div>
                      <div className="img-area">
                        <button>
                        <i className="fe fe-trash"></i>
                        </button>
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT76Nm83SBzhCz1muY6ifAGNhlD4i3OHSAhQw&usqp=CAU"
                          alt=""
                        />
                      </div>
                      <div className="img-area">
                        <button>
                        <i className="fe fe-trash"></i>
                        </button>
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT76Nm83SBzhCz1muY6ifAGNhlD4i3OHSAhQw&usqp=CAU"
                          alt=""
                        />
                      </div>
                    </div>
                    <input type="file" multiple className="form-control" />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-lg-3 col-form-label">Category</label>

                  <div className="col-lg-9">
                    {category?.map((item, index) => {
                      return (
                        <label className="d-block" key={index}>
                          <input
                            value={item._id}
                            onChange={handleCatSelect}
                            checked={
                              catSelected.includes(item._id) ? true : false
                            }
                            type="checkbox"
                          />
                          &nbsp;&nbsp;
                          {item.name}
                        </label>
                      );
                    })}
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-lg-3 col-form-label">Brnad</label>
                  <div className="col-lg-9">
                    <select
                      name="brand"
                      id=""
                      className="form-control"
                      value={input.brand}
                      onChange={handleInputChange}
                    >
                      <option>-select-</option>;
                      {brand?.map((item, index) => {
                        return (
                          <option key={index} value={item._id}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-lg-3 col-form-label">Tags</label>
                  <div className="col-lg-9">
                    <Select
                      options={tagOptions}
                      isMulti
                      components={selectOptAni}
                      value={tags}
                      onChange={(tags) => setTags(tags)}
                    />
                  </div>
                </div>
                <div className="text-right">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;
