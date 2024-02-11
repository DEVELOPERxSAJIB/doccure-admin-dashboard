import { createSlice } from "@reduxjs/toolkit";
import {
  categoryStatusUpdate,
  createBrand,
  createCategory,
  createTag,
  deleteBrand,
  deleteCategory,
  deleteTag,
  getAllBrand,
  getAllCategory,
  getAllTag,
  tagStatusChange,
  updateBrand,
  updateBrandStatus,
  updateTag,
} from "./productApiSlice";

const productSlice = createSlice({
  name: "product",
  initialState: {
    category: null,
    brand: [],
    tag: null,
    message: null,
    error: null,
    loader: null,
  },
  reducers: {
    setMessageEmpty: (state) => {
      (state.error = null), (state.message = null);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createBrand.pending, (state) => {
        state.loader = true;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.brand = state.brand ?? [];
        state.brand.push(action.payload.brand);
        state.loader = false;
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(getAllBrand.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAllBrand.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
        state.brand = action.payload.brand;
      })
      .addCase(getAllBrand.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      .addCase(updateBrandStatus.pending, (state) => {
        state.loader = true;
      })
      .addCase(updateBrandStatus.fulfilled, (state, action) => {
        state.loader = false;
        state.brand[
          state.brand.findIndex((data) => data._id === action.payload.brand._id)
        ] = action.payload.brand;
        state.message = action.payload.message;
      })
      .addCase(updateBrandStatus.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      .addCase(deleteBrand.pending, (state) => {
        state.loader = true;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
        state.brand = state.brand.filter(
          (data) => data._id !== action.payload.brand._id
        );
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      .addCase(updateBrand.pending, (state) => {
        state.loader = true;
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
        state.brand[
          state.brand.findIndex((data) => data._id === action.payload.brand._id)
        ] = action.payload.brand;
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      .addCase(getAllTag.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAllTag.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
        state.tag = action.payload.tag;
      })
      .addCase(getAllTag.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      .addCase(createTag.pending, (state) => {
        state.loader = true;
      })
      .addCase(createTag.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
        state.tag = state.tag ?? [];
        state.tag.push(action.payload.tag);
      })
      .addCase(createTag.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      .addCase(updateTag.pending, (state) => {
        state.loader = true;
      })
      .addCase(updateTag.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
        state.tag[
          state.tag.findIndex((data) => data._id === action.payload.tag._id)
        ] = action.payload.tag;
      })
      .addCase(updateTag.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      .addCase(deleteTag.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
        state.tag = state.tag.filter(
          (data) => data._id !== action.payload.tag._id
        );
      })
      .addCase(tagStatusChange.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
        state.tag[
          state.tag.findIndex((data) => data._id === action.payload.tag._id)
        ] = action.payload.tag;
      })
      .addCase(getAllCategory.fulfilled, (state, action) => {
        state.category = action.payload.category;
      })
      .addCase(createCategory.pending, (state) => {
        state.loader = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.category = state.category ?? [];
        state.loader = false;
        state.message = action.payload.message;
        state.category.push(action.payload.category);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
        state.category = state.category.filter(
          (data) => data._id !== action.payload.category._id
        );
      })
      .addCase(categoryStatusUpdate.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
        state.category[
          state.category.findIndex(
            (data) => data._id === action.payload.category._id
          )
        ] = action.payload.category;
      });
  },
});

// reducers
export const { setMessageEmpty } = productSlice.actions;

// selectors
export const getAllProduct = (state) => state.product;

// default export
export default productSlice.reducer;
