import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
   
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'left',
        paddingHorizontal: 20,
        // backgroundColor: '#ffffff',
    },
    formContainer: {
        width: '100%',
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF', // Changed background color to light gray
        borderRadius: 20,
        paddingVertical: 50,
      },
    label: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    Login:{
      alignContent:'center',
      color:'red',
      marginStart:3,
    },
    redirect:{
      marginTop:3,
      display:'flex',
      flexDirection:'row',
      justifyContent:'center'
    },
    select: {
        height: 40,
        borderColor: '#ccc',
        backgroundColor: '#fff', // Changed background color to white
        marginBottom: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderRadius: 5,
      },
      header: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
      },
      qrCode: {
        width: '100%',
        height: 200,
        marginBottom: 20,
        resizeMode: 'contain',
      },
      gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      },
      gridItem: {
        width: '100%',
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row',
        marginBottom: 10,
      },
      label: {
        fontWeight: 'bold',
        // marginTop:5,
      },
      value: {
        // marginTop: 5,
      },
      buttonBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
      },
      button: {
        flex: 1,
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
      },
      cancelButton: {
        backgroundColor: 'red',
        marginRight: 10,
      },
      confirmButton: {
        backgroundColor: 'green',
        marginLeft: 10,
      },
      buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
      },
      image: {
        width: 200, // Adjust the width as needed
        height:45,
        marginBottom: 20, 
      },
      imageCenter:{
        alignItems:'center'
      },
      homeContainer: {
        width: '100%',
        backgroundColor: '#FFFFFF', // Changed background color to light gray
        borderRadius: 20,
        padding:15,
      },
      row:{
        display:'flex',
        flexDirection:'row',
      },
      column:{
        display:'flex',
        flexDirection:'column',
      },
      cont:{
        width:'100%',
        paddingHorizontal:'5%',
        paddingTop:'20%'
      },
      containerFirst:{
        width: '100%',
        backgroundColor: '#ffaa01', 
        borderRadius: 20,
        paddingVertical: 25,
        marginVertical:20,
      },
      transactionItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
      senderReceiver: {
        fontSize: 16,
        marginBottom: 8,
      },
      transactionDate: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
      },
      status: {
        fontSize: 14,
        color: '#666',
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.1)', // Semi-transparent black background
      },
      modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: '80%', // Adjust width as needed
      },
});
export default styles;
