import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#FFBE3D'}} spin />;
const antIconLarge = <LoadingOutlined style={{ fontSize: 60, color: '#FFBE3D'}} spin />;

export default function LoadingSpinner(props) {
  return (
    <>
      {(props.isLoading && (props.backdrop === undefined  || props.backdrop)) ? (
        <div className="backdrop justify-center flex flex-start w-[100%] pb-[20px]">
          <Spin indicator={antIconLarge} />
        </div>
      ) : (
        <></>
      )}
      {(props.isLoading && (props.backdrop !== undefined && !props.backdrop)) ? (
        <>
          <div className="non-backdrop justify-center flex flex-start w-[100%] pb-[20px]">
            <Spin indicator={antIcon}/>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
