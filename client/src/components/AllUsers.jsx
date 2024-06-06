import { useEffect ,useState} from "react";
import { BsEye } from "react-icons/bs";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useDispatch,useSelector } from "react-redux"
import { ChangeAccess, getAllUser } from "../services/operations/todoAPI";
import Switch from 'react-switch';
function AllUsers() {
    const dispatch = useDispatch() 
    const {token} = useSelector((state)=>state.auth)
    const {allUser,user:loggineduser} = useSelector((state)=>state.profile)

    useEffect(()=>{
        dispatch(getAllUser(token))
    },[])

    const [checked, setChecked] = useState(false);

    const handleChange = (id) => {
        dispatch(ChangeAccess(id,token))
    };
  return (
    <div  className="flex flex-col  gap-x-16 mt-4 pt-4 ">
        <h1 className="text-3xl sm:text-4xl+ font-bold mb-6">Manage Admin</h1>
        <div className="  mt-8 w-full">
      
      
      <div className="table-z-index ">
         {
            allUser && (
            <Table className="rounded  m-auto">
          <Thead>
          {/* bg-[#5e88f2] */}
            <Tr className=" bg-[#006666]  text-white text-left ps-2 font-normal tracking-wider text-base">
              
              <Th className="p-2 w-[400px]">Name</Th>
              <Th className="p-2 w-[400px]">Email</Th>
              <Th className="p-2 w-[400px] rounded-e-md">Admin Access</Th>
            </Tr>
          </Thead>
          <Tbody>
            {allUser
              .map((user) => {
                return (
                  <Tr key={user._id} className={`border-b`}>
                    
                    <Td className="p-2">
                     {user.Name}
                    </Td>
                    <Td className="p-2">
                      {user.Email}
                    </Td>
                    
                    <Td className=" flex flex-row  items-center h-full mt-4 gap-2">
                    <span>

                        <Switch 
                            onChange={()=>handleChange(user._id)} 
                            checked={user.accountType === "Admin" ? true : false} 
                          
                            offColor="#888" 
                            onColor="#0f0" 
                            checkedIcon={false} 
                            uncheckedIcon={false}
                            height={22}
                            disabled={loggineduser.accountType !== "SuperAdmin" ? true : false}
                            
                            
                            
                        />
                    </span>
           
                    </Td>
                    
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
          )
         }
       </div>
    
       
    
    </div>
    </div>
  )
}

export default AllUsers