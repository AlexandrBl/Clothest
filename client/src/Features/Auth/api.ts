// import type { UserAndId, User } from "./type"

//   export const registrationFetch =async(obj:User):Promise<UserAndId>=>{
// const res = await fetch('/api/auth/registration',{
// method:'POST',
// headers: {
//     'Content-Type': 'application/json',
//   },
//   body:JSON.stringify(obj)
// })
// if (res.ok){
//   const data = await res.json()
//   return data.user
// }
//   const {message}=await res.json()
//   throw message

//   }

//   export const checkFetch =async():Promise<{user:UserAndId | null}>=>{
//     const res = await fetch('/api/auth/check')
//     const data = await res.json()
//     return data
//       }