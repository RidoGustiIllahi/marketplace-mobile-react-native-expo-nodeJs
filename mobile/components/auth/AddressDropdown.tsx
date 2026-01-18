import { useEffect, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {
    getProvinces,
    getRegencies,
    getDistricts,
    getVillages,
} from '../../services/regionService';


export default function AddressDropdown({ setAddress }: any) {

    const dropdownStyle = {
        backgroundColor: '#f8f9fa',
        borderColor: '#eee',
        borderRadius: 12,
        marginBottom: 12, // Memberi jarak antar dropdown
    };

    const dropContainerStyle = {
        backgroundColor: '#fff',
        borderColor: '#eee',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
    };

    const [province, setProvince] = useState(null);
    const [regency, setRegency] = useState(null);
    const [district, setDistrict] = useState(null);
    const [village, setVillage] = useState(null);

    const [provinces, setProvinces] = useState([]);
    const [regencies, setRegencies] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [villages, setVillages] = useState([]);

    const [open, setOpen] = useState({
        province: false,
        regency: false,
        district: false,
        village: false,
    });

    useEffect(() => {
        getProvinces().then((data) =>
            setProvinces(data.map((i: any) => ({ label: i.name, value: i.code })))
        );
    }, []);

    useEffect(() => {
        if (!province) return;
        getRegencies(province).then((data) =>
            setRegencies(data.map((i: any) => ({ label: i.name, value: i.code })))
        );
    }, [province]);

    useEffect(() => {
        if (!regency) return;
        getDistricts(regency).then((data) =>
            setDistricts(data.map((i: any) => ({ label: i.name, value: i.code })))
        );
    }, [regency]);

    useEffect(() => {
        if (!district) return;
        getVillages(district).then((data) =>
            setVillages(data.map((i: any) => ({ label: i.name, value: i.code })))
        );
    }, [district]);

    return (
        <>
            <DropDownPicker
                listMode="SCROLLVIEW"
                style={dropdownStyle}
                dropDownContainerStyle={dropContainerStyle}
                open={open.province}
                setOpen={(v) => setOpen({ ...open, province: v })}
                value={province}
                setValue={setProvince}
                items={provinces}
                placeholder="Pilih Provinsi"
                zIndex={4000}
            />

            <DropDownPicker
                listMode="SCROLLVIEW"
                style={dropdownStyle}
                dropDownContainerStyle={dropContainerStyle}
                open={open.regency}
                setOpen={(v) => setOpen({ ...open, regency: v })}
                value={regency}
                setValue={setRegency}
                items={regencies}
                placeholder="Pilih Kabupaten"
                disabled={!province}
                zIndex={3000}
            />

            <DropDownPicker
                listMode="SCROLLVIEW"
                style={dropdownStyle}
                dropDownContainerStyle={dropContainerStyle}
                open={open.district}
                setOpen={(v) => setOpen({ ...open, district: v })}
                value={district}
                setValue={setDistrict}
                items={districts}
                placeholder="Pilih Kecamatan"
                disabled={!regency}
                zIndex={2000}
            />

            <DropDownPicker
                listMode="SCROLLVIEW"
                style={dropdownStyle}
                dropDownContainerStyle={dropContainerStyle}
                open={open.village}
                setOpen={(v) => setOpen({ ...open, village: v })}
                value={village}
                setValue={setVillage}
                items={villages}
                placeholder="Pilih Kelurahan"
                disabled={!district}
                zIndex={1000}
                onChangeValue={(v) => v && setAddress(v)}
            />
        </>
    );
}

