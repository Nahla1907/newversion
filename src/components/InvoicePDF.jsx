import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import formatDate from '../function/formatDate';
import amiriFont from '../assets/fonts/amiri/Amiri-Regular.ttf';
import logo from '../assets/logo.png';

Font.register({
  family: 'amiri ',
  src: amiriFont,
});


// Function to convert numbers to Arabic words, including decimals
const numberToArabicWords = (num) => {
  const ones = ['صفر', 'واحد', 'اثنان', 'ثلاثة', 'أربعة', 'خمسة', 'ستة', 'سبعة', 'ثمانية', 'تسعة'];
  const tens = ['', 'عشرة', 'عشرون', 'ثلاثون', 'أربعون', ' خمسون', 'ستون', 'سبعون', 'ثمانون', 'تسعون'];
  const teens = ['عشرة', 'أحد عشر', 'اثنا عشر', 'ثلاثة عشر', 'أربعة عشر', 'خمسة عشر', 'ستة عشر', 'سبعة عشر', 'ثمانية عشر', 'تسعة عشر'];
  const hundreds = ['', 'مئة', 'مئتان', 'ثلاثمئة', 'أربعمئة', 'خمسمئة', 'ستمئة', 'سبعمئة', 'ثمانمئة', 'تسعمئة'];

  const thousands = ['ألف', 'ألفان', 'آلاف'];
  const millions = ['مليون', 'مليونان', 'ملايين'];
  const billions = ['مليار', 'ملياران', 'مليارات'];
  const trillions = ['تريليون', 'تريليونان', 'تريليونات'];

  const getOnes = (n) => ones[n];
  const getTeens = (n) => teens[n - 10];
  const getTens = (n) => {
    if (n < 10) return getOnes(n);
    if (n >= 10 && n < 20) return getTeens(n);
    const tenPart = tens[Math.floor(n / 10)];
    const onePart = ones[n % 10];
    return onePart !== 'صفر' ? `${onePart} و ${tenPart}` : tenPart;
  };

  const getHundreds = (n) => {
    if (n === 0) return '';
    const hundredPart = hundreds[Math.floor(n / 100)];
    const rest = n % 100;
    return rest > 0 ? `${hundredPart} و ${getTens(rest)}` : hundredPart;
  };

  const getThousands = (n) => {
    if (n === 0) return '';
    const thousandPart = Math.floor(n / 1000);
    const rest = n % 1000;
    let result = '';
    if (thousandPart > 0) {
      if (thousandPart === 1) {
        result += thousands[0];
      } else if (thousandPart === 2) {
        result += thousands[1];
      } else {
        result += `${getHundreds(thousandPart)} ${thousands[2]}`;
      }
    }
    if (rest > 0) {
      result += ` و ${getHundreds(rest)}`;
    }
    return result.trim();
  };

  const getMillions = (n) => {
    if (n === 0) return '';
    const millionPart = Math.floor(n / 1000000);
    const rest = n % 1000000;
    let result = '';
    if (millionPart > 0) {
      if (millionPart === 1) {
        result += millions[0];
      } else if (millionPart === 2) {
        result += millions[1];
      } else {
        result += `${getThousands(millionPart)} ${millions[2]}`;
      }
    }
    if (rest > 0) {
      if (result) result += ' و '; // Add "و" only if there's something before it
      result += getThousands(rest);
    }
    return result.trim();
  };

  const getBillions = (n) => {
    if (n === 0) return '';
    const billionPart = Math.floor(n / 1000000000);
    const rest = n % 1000000000;
    let result = '';
    if (billionPart > 0) {
      if (billionPart === 1) {
        result += billions[0];
      } else if (billionPart === 2) {
        result += billions[1];
      } else {
        result += `${getMillions(billionPart)} ${billions[2]}`;
      }
    }
    if (rest > 0) {
      if (result) result += ' و '; // Add "و" only if there's something before it
      result += getMillions(rest);
    }
    return result.trim();
  };

  const getTrillions = (n) => {
    if (n === 0) return '';
    const trillionPart = Math.floor(n / 1000000000000);
    const rest = n % 1000000000000;
    let result = '';
    if (trillionPart > 0) {
      if (trillionPart === 1) {
        result += trillions[0];
      } else if (trillionPart === 2) {
        result += trillions[1];
      } else {
        result += `${getBillions(trillionPart)} ${trillions[2]}`;
      }
    }
    if (rest > 0) {
      if (result) result += ' و '; // Add "و" only if there's something before it
      result += getBillions(rest);
    }
    return result.trim();
  };

  const convertInteger = (n) => {
    if (n < 1000) return getHundreds(n);
    if (n < 1000000) return getThousands(n);
    if (n < 1000000000) return getMillions(n);
    if (n < 1000000000000) return getBillions(n);
    return getTrillions(n);
  };

  const convertDecimalPart = (n) => {
    const decimalValue = parseInt(n);
    return decimalValue < 10 ? ones[decimalValue] : getTens(decimalValue);
  };

  const [whole, fraction] = num.toString().split('.');

  const wholeInWords = convertInteger(parseInt(whole)) + ' دينار جزائري'; // Adding 'دينار جزائري'
  
  // Only add the fraction part if it's not zero
  const fractionInWords = fraction && parseInt(fraction) > 0 ? ` و ${convertDecimalPart(fraction)} سنتيم` : '';

  return fractionInWords ? `${wholeInWords}${fractionInWords}` : wholeInWords;
};

 // Example usage:
// console.log(numberToArabicWords(14451440.36)); // "أربعة عشر مليون و خمسمئة و أربعة و أربعون ألف دينار جزائري و ستة و ثلاثون سنتيم"


const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    fontFamily: 'amiri ',
    position: 'relative',
  },
  logo: {
    width: 50,
    height: 50,
    position: 'absolute',
    top: 20,
    left: 20,
  },
  header: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  institutionDetails: {
    fontSize: 14,
    textAlign: 'right',
    marginBottom: 10,
    lineHeight: 1.5,
  },
  locationDate: {
    fontSize: 14,
    textAlign: 'left',
    marginBottom: 10,
  },
  invoiceTitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    width: '20%',
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    padding: 5,
  },
  tableCell: {
    textAlign: 'center',
    fontSize: 14,
  },
  summaryRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#000',
    borderTopStyle: 'solid',
  },
  summaryRow2: {
    textAlign: 'center',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#000',
    borderTopStyle: 'solid',
  },
  summaryCol: {
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    padding: 5,
    width: '20%',
    textAlign: 'right',
  },
  summaryText: {
    textAlign: 'right',
    fontSize: 14,
  },
  summaryTotalCol: {
    width: '80%',
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    padding: 5,
    textAlign: 'right',
  },
  summaryTotalCol2: {
    width: '100%',
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    padding: 5,
   
  },
  footer: {
    marginTop: 20,
    fontSize: 14,
    textAlign: 'center',
  },
  signature: {
    fontSize: 18,
    textAlign: 'right',
    marginTop: 20,
    marginRight: 50,
  },
});

const isValidValue = (value) => {
  return value !== null && value !== undefined && 
         (typeof value === 'string' ? value.trim() !== '' : value !== 0);
};

const InvoicePDF = ({ invoice }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Image style={styles.logo} src={logo} />
      <Text style={styles.header}>الجمهورية الجزائرية الديمقراطية الشعبية</Text>
      <View style={styles.institutionDetails}>
      
        <Text > ولاية إليزي </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
  <Text style={{ textAlign: 'left', fontSize: 14 }}> .................: إليزي ف  </Text>
  <Text style={{ textAlign: 'right', fontSize: 14 }}> الوكالة الولائية للتسيير </Text>
</View>
        {/* <Text> الوكالة الولائية للتسيير</Text> */}
        <Text>و التنظيم العقاريين الحضريين</Text>
        <Text>العنوان : الحي الإداري -- طريق إن اميناس -- إليزي --  33000</Text>
        <Text>رقم الحساب البنكي الجاري : 96/ 248 300 0000 946 003 00</Text>
        <Text> بنك الفلاحة و التنمية الريفية / وكالة إليزي </Text>
        <Text>الرقم الجبائي : 000633060209497</Text>
        <Text>رقم المادة الجبائية : 33010009021</Text>
        <Text>رقم الهاتف / الفاكس : 029404129</Text>
       
      </View>
      <Text style={styles.invoiceTitle}>فاتورة رقم :{invoice.Invoicenumber}</Text>
      <View style={styles.institutionDetails}>
        <Text>:(ة)السيد {invoice.clientName}</Text> 
      </View>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}><Text style={styles.tableCell}>المجموع</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>السعر الوحدوي</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>المساحة</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>التعيين</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>الرقم</Text></View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}><Text style={styles.tableCell}>{invoice.total} </Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>{invoice.price}</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>{invoice.months}</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>{invoice.description}</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>1</Text></View>
        </View>

        <View style={styles.summaryRow}>
          <View style={styles.summaryCol}><Text style={styles.summaryText}>{invoice.total}</Text></View>
          <View style={styles.summaryTotalCol}><Text style={styles.summaryText}>المجموع خارج الرسوم</Text></View>
        </View>
        <View style={styles.summaryRow}>
          <View style={styles.summaryCol}><Text style={styles.summaryText}>{invoice.TVA}</Text></View>
          <View style={styles.summaryTotalCol}><Text style={styles.summaryText}>الرسوم على القيمة المضافة %09</Text></View>
        </View>
        <View style={styles.summaryRow}>
          <View style={styles.summaryCol}><Text style={styles.summaryText}>{invoice.FinalP}</Text></View>
          <View style={styles.summaryTotalCol}><Text style={styles.summaryText}>المجموع بكل الرسوم</Text></View>
        </View>

        {/* Render conditional fields */}
        {isValidValue(invoice.clientCountry) && (
          <View style={styles.summaryRow2}>
            <View style={styles.summaryTotalCol2}><Text style={styles.summaryText}>{invoice.clientCountry}: المبلغ المسدد 1</Text></View>
          </View>
        )}

        {isValidValue(invoice.clientCity) && (
          <View style={styles.summaryRow2}>
            <View style={styles.summaryTotalCol2}><Text style={styles.summaryText}>{invoice.clientCity}: المبلغ المسدد 2</Text></View>
          </View>
        )}

        {isValidValue(invoice.paymentTerms) && (
          <View style={styles.summaryRow2}>
            <View style={styles.summaryTotalCol2}><Text style={styles.summaryText}>{invoice.paymentTerms}: المبلغ المسدد 3</Text></View>
          </View>
        )}

        {isValidValue(invoice.Delay) && (
          <View style={styles.summaryRow2}>
            <View style={styles.summaryTotalCol2}><Text style={styles.summaryText}>{invoice.Delay}: المبلغ المسدد 4</Text></View>
          </View>
        )}

        {isValidValue(invoice.stampmoney) && (
          <View style={styles.summaryRow2}>
            <View style={styles.summaryTotalCol2}><Text style={styles.summaryText}>{invoice.stampmoney}: المبلغ المسدد 5</Text></View>
          </View>
        )}

       
      </View>

      
      <View style={styles.institutionDetails}>  
      <Text>   أوقفت الفاتورة عند المبلغ :{numberToArabicWords(invoice.FinalP)}  </Text>
      </View> 
         
      
      <View style={styles.signature}>
        <Text>المديـــــــــــر</Text>
      </View>
    </Page>
  </Document>
);

export default InvoicePDF;
