import React from 'react';

import "styles/App.css";

import Header from "components/Header"
import Product from "components/Product"
import Filter from "components/Filter";

import FilterDetail from "components/FilterDetail";

import {BrowserRouter, Navigate, Routes, Route} from "react-router-dom";
import useFilter from "hooks/useFilter";

const App: React.FunctionComponent = () => {
    const {
        filters,
        filterDetails,
        showDetail,
        showClearAll,
        travels,
        loading,
        error,
        handleAddFilter,
        handleRemoveFilter,
        handleFilterDetail,
        handleFilterDetailClose,
        handleClearAll
    } = useFilter();

    return (
    <div className="App">
        <BrowserRouter>
            <Header />
            <Filter
                list={filters}
                showClear={showClearAll}
                onAddFilter={handleAddFilter}
                onRemoveFilter={handleRemoveFilter}
                onClearAll={handleClearAll}
            />
            {
                showDetail === true ?
                    <FilterDetail
                        data={filterDetails}
                        onFilter={handleFilterDetail}
                        onPopupClose={handleFilterDetailClose}
                    />
                    : <></>
            }
            <Routes>
                <Route
                    path="/list"
                    element={
                        <Product
                            data={travels}
                            isLoading={loading}
                            isError={error}
                        />
                    }
                />
                <Route path="*" element={<Navigate to="/list" replace />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;