import React,{useState} from 'react'
import './App.css';
import 'antd/dist/antd.css';
import './index.css';
import { Row, Col } from 'antd';
import rawData from "./data.js";
import { Table, Input } from "antd";
import { Select,Button } from 'antd';
const { Option } = Select;
function App() {

      const [province,setProvince]=useState(null);
      const [year,setYear]=useState(null)
      const [cat,setCat]=useState(null)


 const onHandleProvince=(value)=>{
   setProvince(value.value);
 }
const onHandleYear=(value)=>{
   setYear(value.value)
}
const onHandleCategory=(value)=>{
   setCat(value.value)
}

const onSearchClick=()=>{
  let query={
    province:province,
    year:year,
    category:cat

  }

if(query.year&&query.category&&query.province){
  filterTable = rawData.filter(obj =>  obj.EnterDate.toLowerCase().includes(query.year)&&
  obj.City===query.province&&obj.Enable===query.category);
   console.log(filterTable);
setFilterTable(filterTable)

}
else if(query.year&&query.category){
  filterTable = rawData.filter(obj =>  obj.EnterDate.toLowerCase().includes(query.year)&&
  obj.Enable===query.category);
   console.log(filterTable);
setFilterTable(filterTable)
}
else if(query.year&&query.province){
  filterTable = rawData.filter(obj =>  obj.EnterDate.toLowerCase().includes(query.year)&&
  obj.City===query.province);
   console.log(filterTable);
setFilterTable(filterTable)

}
else if(query.province && query.category){
  filterTable = rawData.filter(obj =>  
  obj.City===query.province && obj.Enable===query.category);
   console.log(filterTable);
setFilterTable(filterTable)
}

else if(query.category){
  filterTable = rawData.filter(obj =>  
    obj.Enable===query.category);
     
  setFilterTable(filterTable)
}
else if(query.province){
  filterTable = rawData.filter(obj =>  
    obj.City===query.province);
  setFilterTable(filterTable)
}
else if (query.year){
  filterTable = rawData.filter(obj =>  obj.EnterDate.toLowerCase().includes(query.year));
  setFilterTable(filterTable)
}else{
  setFilterTable(rawData);
}

 
  
  }

const baseColumns = [
    {
      title: "Name",
      dataIndex: "Name",
      key: "name",
      render: text => <a href="www.google.com">{text}</a>
    },
    {
      title: "Company",
      dataIndex: "Company",
      key: "company"
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "email"
    },
    {
      title: "City",
      dataIndex: "City",
      key: "city"
    },
    {
      title: "Salary",
      dataIndex: "Salary",
      key: "Salary"
    },
    {
      title: "Enable",
      dataIndex: "Enable",
      key: "enable"
    },
    {
      title: "EnterDate",
      dataIndex: "EnterDate",
      key: "enterDate"
    },
    {
      title: "Personal",
      dataIndex: "Personal",
      key: "personal"
    }
  ];
  
   let[filterTable,setFilterTable]=useState(null);
 
 const  search = (value) => {
    
    console.log("PASS", { value });

    const filterTable = rawData.filter(o =>
      Object.keys(o).some(k =>
        String(o[k])
          .toLowerCase()
          .includes(value.toLowerCase())
      )
    );

    setFilterTable( filterTable );
  };
  return (
        <div>
   
 <Row>
      <Col span={24}>
      <Input.Search
          style={{ border: "3px solid red", margin: "0 0 10px 0" }}
          placeholder="Search by..."
          enterButton
          onSearch={search}
        />
         <Select
    labelInValue
    placeholder={
      "Select Year"
    }
    style={{ width: 150, marginRight:"20px" }}
    onChange={onHandleYear}
  >
    <Option value="2020">2020</Option>
    <Option value="2019">2019</Option>
    <Option value="2018">2018</Option>

  </Select>
  <Select
    labelInValue
   placeholder={'Select Province'}
    style={{ width: 150, marginRight:"20px" }}
    onChange={onHandleProvince}
  >
    <Option value="NewYork">NewYork</Option>
    <Option value="London">London</Option>
    <Option value="Toronto">Toronto</Option>

  </Select>
  <Select
    labelInValue
    placeholder={'Select Category'}
    style={{ width: 150, marginRight:"20px" }}
    onChange={onHandleCategory}
  >
    <Option value="Awards">Awards</Option>
    <Option value="Scholarships">Scholarships</Option>
  </Select>

  <Button
  onClick={onSearchClick} 
  >Search
  </Button>
      <Table
          columns={baseColumns}
          dataSource={filterTable == null ? rawData : filterTable}
        />
       
      </Col>
    </Row>




        </div>
   
  );
}

export default App;
