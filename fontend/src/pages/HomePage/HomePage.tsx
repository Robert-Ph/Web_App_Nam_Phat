import "./homepage.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CandlestickChartIcon from '@mui/icons-material/CandlestickChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';




// Lấy ngày hiện tại
const today = new Date();
const currentMonth = (today.getMonth() + 1).toString().padStart(2, '0'); // tháng hiện tại
const formattedDate = today.toLocaleDateString(); // ngày hiẹn tại

const HomePage = () => {
  return (


      <div className="container">
        <div className="hearder">
            <div className="box">
                <div className="icon">
                    <TrendingUpIcon className="icon-size"></TrendingUpIcon>
                </div>
                <div className="icon textbox">
                    <p>Doanh thu</p>
                    <p>0 vnđ</p>
                </div>
            </div>
            <div className="box">
                <div className="icon">
                    <ShoppingCartOutlinedIcon className="icon-size"></ShoppingCartOutlinedIcon>
                </div>
                <div className="icon textbox">
                    <p>Đơn hàng</p>
                    <p>0</p>
              </div>
          </div>
            <div className="box">
                <div className="icon">
                    <GroupAddIcon className="icon-size"></GroupAddIcon>
                </div>
                <div className="icon textbox">
                    <p>Khách hàng</p>
                    <p>0</p>
                </div>
            </div>
            <div className="box">
                <div className="icon">
                    <CandlestickChartIcon className="icon-size"></CandlestickChartIcon>
                </div>
                <div className="icon textbox">
                    <p>Chi tiêu</p>
                    <p>0 vnđ</p>
                </div>
            </div>
        </div>
          <div className="body">
              <div className="div">
                  <p className="text">Hoạt động</p>
                  <p className="text" >Tháng {currentMonth}</p>
              </div>
              <div className="div-body">
                    <table className="table-container">
                        <tbody>
                        <tr>
                            <td>Tổng doanh thu:</td>
                            <td>0</td>
                            <td>vnđ</td>
                        </tr>
                        <tr>
                            <td>Tổng đơn hàng:</td>
                            <td>0</td>

                        </tr>
                        <tr>
                            <td>Doanh thu/ Đơn hàng:</td>
                            <td>0</td>
                            <td>vnđ</td>
                        </tr>
                        <tr>
                            <td>Tổng chi:</td>
                            <td>0</td>
                            <td>vnđ</td>
                        </tr>
                        <tr>
                            <td>Tổng thu thực:</td>
                            <td>0</td>
                            <td>vnđ</td>
                        </tr>
                        <tr>
                            <td>Tổng công nợ:</td>
                            <td>0</td>
                            <td>vnđ</td>
                        </tr>
                        </tbody>
                    </table>
              </div>

          </div>
          <div className="body">
              <div className="div">
                  <p className="text">Đơn hàng</p>
                  <p className="text">Ngày {formattedDate}</p>
              </div>
              <div className="div-body">
                  <table className="table-container">
                      <tbody>
                      <tr>
                          <td>Tổng đơn hàng:</td>
                          <td>0</td>

                      </tr>
                      <tr>
                          <td>Tổng giá trị:</td>
                          <td>0</td>
                          <td>vnđ</td>
                      </tr>
                      <tr>
                          <td>Đơn hàng đã giao:</td>
                          <td>0</td>

                      </tr>
                      <tr>
                          <td>Đơn hàng chưa hoàn thành:</td>
                          <td>0</td>

                      </tr>
                      <tr>
                          <td>Đã thanh toán:</td>
                          <td>0</td>
                          <td>vnđ</td>
                      </tr>
                      <tr>
                          <td>Còn nợ:</td>
                          <td>0</td>
                          <td>vnđ</td>
                      </tr>
                      </tbody>
                  </table>
              </div>
          </div>
          <div className="body ">

              <div className="main">
                  <div className="div div-1">
                      <p className="text">Công nợ khách hàng</p>
                  </div>
                  <div className="div-body-1">
                      <table className="table-container">
                          <tbody>
                          <tr>
                              <td>Tổng công nợ:</td>
                              <td>0</td>
                              <td>vnđ</td>
                          </tr>
                          <tr>
                              <td>Tổng số khách hàng:</td>
                              <td>0</td>

                          </tr>
                          </tbody>
                      </table>
                  </div>
              </div>
              <div className="main">
                  <div className="div div-1">
                      <p className="text">Lợi nhuận</p>
                  </div>
                  <div className="div-body-1">
                      <table className="table-container">
                          <tbody>
                          <tr>
                              <td>Tổng lợi nhuận tháng:</td>
                              <td>0</td>
                              <td>vnđ</td>
                          </tr>
                          <tr>
                              <td>Tổng lợi nhuận:</td>
                              <td>0</td>
                              <td>vnđ</td>
                          </tr>
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
          <div className="body">
              <div className="div">
                  <p className="text">Chi tiêu</p>
              </div>
              <div className="div-body">
                  <table className="table-container">
                      <tbody>
                      <tr>
                          <td>Tổng chi:</td>
                          <td>0</td>
                          <td>vnđ</td>
                      </tr>
                      <tr>
                          <td>Tổng đơn mua:</td>
                          <td>0</td>
                          <td>vnđ</td>
                      </tr>
                      <tr>
                          <td>Đã thanh toán:</td>
                          <td>0</td>
                          <td>vnđ</td>
                      </tr>
                      <tr>
                          <td>Còn nợ:</td>
                          <td>0</td>
                          <td>vnđ</td>
                      </tr>
                      <tr>
                          <td>Luong nhân viên:</td>
                          <td>0</td>
                          <td>vnđ</td>
                      </tr>
                      <tr>
                          <td>Chi tiêu khác:</td>
                          <td>0</td>
                          <td>vnđ</td>
                      </tr>
                      </tbody>
                  </table>
              </div>
          </div>
      </div>


  );
};

export default HomePage;
