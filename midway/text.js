import { combineReducers } from "redux";


let a = [1,2,3,4,5]
let b = [3,5,7,9,11]

let CombinedArray = [...a,...b]

function FindUniqueNum() 
{

	for (var i = 0 ; i < CombinedArray.length ; i++ )
		{
			for (var j = i+1 ; j <  CombinedArray.length ; j++ )
				{
                    var c=[]
					if( a[j]  == a[i] )
					{
                        c.push(a[i])
                        CombinedArray.splice(i,1)
                    }
                }
                
        }
        return CombinedArray;

}