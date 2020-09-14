import { Pagination } from "antd";

const itemRender = (_, type, originalElement) => {
  if (type === "prev") {
    return(
      <div className="prev-next-pagination">
        <a>
          <i className="far fa-chevron-left va-1px" />
        </a>
      </div>
    ) 
  }
  if (type === "next") {
    return(
      <div className="prev-next-pagination">
        <a>
          <i className="far fa-chevron-right va-1px" />
        </a>
      </div>
    ) 
  }
  return originalElement;
};

const PaginationContainer = () => {
  return (
    <>
      <Pagination
        itemRender={itemRender}
        showSizeChanger={false}
        defaultCurrent={40}
        pageSize={1}
        total={500}
        responsive
      />
      <style jsx>{`
        :global(.prev-next-pagination){
          height: inherit;
          border-radius: .25rem;
          border: 1px solid #d9d9d9;
        }
        :global(.ant-pagination-item){
          border-radius: .25rem;
        }
        :global(.ant-pagination-item-active, 
                .ant-pagination-item-active:focus, 
                .ant-pagination-item-active:hover, 
                .ant-pagination-item:focus, 
                .ant-pagination-item:hover){
          border-color: #343a40;
        }
        :global(.ant-pagination-item:focus a, 
                .ant-pagination-item:hover a, 
                .ant-pagination-jump-prev .ant-pagination-item-container .ant-pagination-item-link-icon, 
                .ant-pagination-jump-next .ant-pagination-item-container .ant-pagination-item-link-icon){
          color: #343a40;
        }
        :global(.ant-pagination-item-link-icon.anticon){
          vertical-align: 2px;
        }
        :global(.va-1px){
          vertical-align: 1px;
        }
      `}</style>
    </>
  );
};

export default PaginationContainer;
