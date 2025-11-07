import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

// fetch all jobs from backend 
export const fetchProducts = createAsyncThunk(async () => {
    const res = await axios.get('/api/product/all');
    return res.data.products;
});

const productSlice = createSlice({
    name: "products",
    initialState:{
        products: [],
        searchTerm: "",
        loading: false,
        error: null
    },
    reducers:{
        setSearchTerm:(state, action) => {
            state.searchTerm = action.payload.toLowerCase();
        }
    },
    extraReducers:(builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
        })
         .addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
});

export const { searchTerm } = productSlice.actions;
export default productSlice.reducer;