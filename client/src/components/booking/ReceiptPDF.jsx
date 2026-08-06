import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
  },

  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 5,
  },

  subtitle: {
    textAlign: "center",
    marginBottom: 25,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    borderBottom: "1 solid #ddd",
    paddingBottom: 5,
  },

  label: {
    fontWeight: "bold",
  },

  footer: {
    marginTop: 40,
    textAlign: "center",
    color: "grey",
  },
});

const ReceiptPDF = ({ booking }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>HostelHub</Text>

      <Text style={styles.subtitle}> Booking Receipt</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Receipt No</Text>

        <Text>HH-{booking._id.slice(-6).toUpperCase()}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Customer Name</Text>

        <Text>{booking.user.fullName}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Customer ID</Text>

        <Text>{booking.user._id}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Email</Text>

        <Text>{booking.user.email}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Phone</Text>

        <Text>{booking.user.phone}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Room Number</Text>

        <Text>{booking.room.roomNumber}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Room Type</Text>

        <Text>{booking.room.roomType}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Sharing</Text>

        <Text>{booking.room.sharingType}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Check In</Text>

        <Text>{new Date(booking.checkInDate).toLocaleDateString()}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Check Out</Text>

        <Text>{new Date(booking.checkOutDate).toLocaleDateString()}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Guests</Text>

        <Text>{booking.numberOfGuests}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Total Paid</Text>

        <Text>₹{booking.totalAmount}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Payment Status</Text>

        <Text>{booking.paymentStatus}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Booking Status</Text>

        <Text>{booking.bookingStatus}</Text>
      </View>

      <Text style={styles.footer}>Thank you for choosing HostelHub ❤️</Text>
    </Page>
  </Document>
);

export default ReceiptPDF;
