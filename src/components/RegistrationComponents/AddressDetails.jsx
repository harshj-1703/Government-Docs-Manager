import React,{useState,useEffect} from "react";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import * as data from "../../assets/state and cities.json";

function AddressDetails({setStep,address,setAddress,pincode,setPincode,selectedState,setSelectedState,selectedCity,setSelectedCity}){
    const [addressError, setAddressError] = useState("");
    const [pincodeError, setPincodeError] = useState("");
    const [stateOptions, setStateOptions] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);
    const [stateError, setStateError] = useState("");
    const [cityError, setCityError] = useState("");

    useEffect(() => {
        const statesData = Object.keys(data).map((state) => ({
          value: state,
          label: state,
        }));
        setStateOptions(statesData);
      }, []);

    const handleRegister2 = () => {
        const isAddressValid = validateAddress(address);
        const isPincodeValid = validatePincode(pincode);
        const isStateValid = validateState(selectedState);
        const isCityValid = validateCity(selectedCity);
        if (isAddressValid && isPincodeValid && isStateValid && isCityValid) {
            setStep(5);
            // ToastMessage({
            //   message: "Registration successful!",
            //   type: "success",
            // });
        }
    };


  const validateAddress = (value) => {
    if (value.trim() === "") {
      setAddressError("Address is required.");
      return false;
    } else if (value.length > 50) {
      setAddressError("Address Length Must Less Then 50 letters");
      return false;
    } else {
      setAddressError("");
      return true;
    }
  };

  const validatePincode = (value) => {
    const pincodeRegex = /^\d{6}$/;

    if (value.trim() === "") {
      setPincodeError("Pin code is required.");
      return false;
    } else if (!pincodeRegex.test(value)) {
      setPincodeError("Invalid pin code. It should be exactly 6 digits.");
      return false;
    } else {
      setPincodeError("");
      return true;
    }
  };

  const validateState = (value) => {
    if (!value) {
      setStateError("State is required.");
      return false;
    } else {
      setStateError("");
      return true;
    }
  };

  const validateCity = (value) => {
    if (!value) {
      setCityError("City is required.");
      return false;
    } else {
      setCityError("");
      return true;
    }
  };

  const handleStateChange = (e) => {
    const selectedStateValue = e.target.value;
    setSelectedState(selectedStateValue);

    if (data[selectedStateValue]) {
      setCityOptions(
        data[selectedStateValue].map((city) => ({ value: city, label: city }))
      );
      setCityError(null);
    } else {
      setCityOptions([]);
      setCityError("No cities found for the selected state");
    }

    setSelectedCity(null);
  };

  const handleCityChange = (e) => {
    const selectedCityValue = e.target.value;
    setSelectedCity(selectedCityValue);
  };


    return (
        <>
        <LazyLoadComponent>
            <h2>Address Details</h2>
            {/* Address */}
            <div>
              <label htmlFor="address">Address:</label>
              <textarea
                type="text"
                placeholder="Address"
                value={address}
                rows={3}
                onChange={(e) => {
                  setAddress(e.target.value);
                  validateAddress(e.target.value);
                }}
              />
              {addressError && <span className="error">{addressError}</span>}
            </div>
            {/* Pincode */}
            <label htmlFor="pincode">PinCode:</label>
            <div>
              <input
                type="text"
                placeholder="Pin Code"
                maxLength={6}
                value={pincode}
                onChange={(e) => {
                  setPincode(e.target.value);
                  validatePincode(e.target.value);
                }}
              />
              {pincodeError && <span className="error">{pincodeError}</span>}
            </div>
            {/* State & City */}
            <div>
              <label htmlFor="state">State:</label>
              <div>
                <select
                  value={selectedState || ""}
                  onChange={handleStateChange}
                >
                  <option value="" disabled>
                    Select State
                  </option>
                  {stateOptions.map((state) => (
                    <option key={state.value} value={state.value}>
                      {state.label}
                    </option>
                  ))}
                </select>
                {stateError && <span className="error">{stateError}</span>}
              </div>

              <label htmlFor="city">City:</label>
              <div>
                <select value={selectedCity || ""} onChange={handleCityChange}>
                  <option value="" style={{ color: "#bbb" }} disabled>
                    Select City
                  </option>
                  {cityOptions
                    .filter(
                      (city, index, self) =>
                        index === self.findIndex((c) => c.value === city.value)
                    )
                    .map((city) => (
                      <option key={city.value} value={city.value}>
                        {city.label}
                      </option>
                    ))}
                </select>
                {cityError && <span className="error">{cityError}</span>}
              </div>
            </div>
            {/* submit */}
            <button
              onClick={(e) => {
                e.preventDefault();
                handleRegister2();
              }}
              className="registration-button"
            >
              Add Address
            </button>
          </LazyLoadComponent>
        </>
    )
}

export default AddressDetails;