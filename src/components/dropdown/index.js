import Dropdown from "./Dropdown";
import Option from "./Option";
import Search from "./Search";
import Select from "./Select";
import List from "./List";

//Biến Option, Search là thuộc tính của Dropdown tránh phải export nhiều
Dropdown.Option = Option;
Dropdown.Search = Search;
Dropdown.Select = Select;
Dropdown.List = List;

export { Dropdown };
