import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ShareButton from './ShareButton';
import axios from 'axios';
import LogoutButton from './LogoutButton';
import NameSuggestion from './NameSuggestion';

const FindVoter = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [partId, setPartId] = useState('');
  const [name, setName] = useState('');
  const [houseNo, setHouseNo] = useState('');
  const [fatherOrHusbandName, setRelationName] = useState('');
  const [voterId, setVoterId] = useState('');
  const [voter, setVoters] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [voterDetailsForShare, setVoterDetailsForShare] = useState([]);
  const nameSuggestionRef = useRef(null);

  useEffect(() => {
    document.title = "Search Voter - Election App";
  }, []);

  const handleCheckboxForSupporter = (v) => {
    v = { ...v, supporter: !v.supporter };
    methodToUpdateStatus(v);
  };

  const handleCheckboxForVoted = (v) => {
    v = { ...v, voted: !v.voted };
    methodToUpdateStatus(v);
  };

  const methodToUpdateStatus = (v) => {
    axios.put(`${apiUrl}/api/voters/updateVoter`, v)
      .then(response => {
        setVoters(voter.map(item => item.id === v.id ? { ...item, ...v } : item));
      })
      .catch(error => {
        console.error('Error updating voter status', error);
      });
  };

  const handleCheckboxForOut = (v) => {
    v = { ...v, out: !v.out };
    methodToUpdateStatus(v);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !partId) {
      setError('Name and PartId are mandatory fields!');
      handleClear();
      return;
    }

    const voterData = { partId, name };
    await axios.post(`${apiUrl}/api/voters/fetchVotersDetails`, voterData)
      .then(response => {
        setError('');
        const fetchedVoter = response.data;
        if (fetchedVoter.length === 0) {
          setError('No Voter Details Found!');
        }
        const formattedMessage = fetchedVoter
          .map((item) => `Part Id : ${item.partId}, Sr no. : ${item.id}, Name : ${item.name}, Father's / Husband's Name : ${item.fatherOrHusbandName}, Voted : ${item.voted}, Supporter : ${item.supporter}, Out : ${item.isOut}, Age : ${item.age}, Phone Number : ${item.phoneNumber}, House No : ${item.houseNumber}, Voter Id : ${item.voterId}, Address : ${item.address}, Booth Address : ${item.boothAddress}`)
          .join('\n\n\n');
        setVoterDetailsForShare(formattedMessage);
        setVoters(fetchedVoter);
      });

    handleClear();
  };

  const handleClear = () => {
    setPartId('');
    setName('');
    setHouseNo('');
    setRelationName('');
    setVoterId('');
    if (nameSuggestionRef.current) {
      nameSuggestionRef.current.clearSuggestion();
    }
  };

  const handleClearSearch = () => {
    setVoters([]);
    setError('');
  };

  const handleSurvey = () => {
    navigate('/survey');
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-full">
        <LogoutButton />
      </div>
      <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-6 mt-6">
        <h1 className="text-xl font-semibold mb-4">Find Voter</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Part Id"
            value={partId}
            onChange={(e) => setPartId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <NameSuggestion ref={nameSuggestionRef} setName={setName} />
          <input
            type="text"
            placeholder="House No"
            value={houseNo}
            onChange={(e) => setHouseNo(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Father's/Husband's Name"
            value={fatherOrHusbandName}
            onChange={(e) => setRelationName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Voter ID"
            value={voterId}
            onChange={(e) => setVoterId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <div className="flex justify-between mt-4">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 w-full max-w-[48%]">
              Submit
            </button>
            <button type="button" className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition duration-300 w-full max-w-[48%]" onClick={handleClear}>
              Clear
            </button>
          </div>
        </form>
      </div>
      <div className="w-full max-w-xl mt-6">
        {voter.length > 0 && (
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Search Result</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2">#</th>
                    <th className="px-4 py-2">Part Id</th>
                    <th className="px-4 py-2">Sr no.</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Father's / Husband's Name</th>
                    <th className="px-4 py-2">Voted</th>
                    <th className="px-4 py-2">Supporter</th>
                    <th className="px-4 py-2">Out</th>
                    <th className="px-4 py-2">Age</th>
                    <th className="px-4 py-2">Phone Number</th>
                    <th className="px-4 py-2">House No</th>
                    <th className="px-4 py-2">Voter Id</th>
                    <th className="px-4 py-2">Address</th>
                    <th className="px-4 py-2">Booth Address</th>
                  </tr>
                </thead>
                <tbody>
                  {voter.map((v, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{v.partId}</td>
                      <td className="px-4 py-2">{v.id}</td>
                      <td className="px-4 py-2">{v.name}</td>
                      <td className="px-4 py-2">{v.fatherOrHusbandName}</td>
                      <td className="px-4 py-2">
                        <input
                          name={`voted-${index}`}
                          id={`voted-${index}`}
                          type="checkbox"
                          checked={v.voted}
                          onChange={() => handleCheckboxForVoted(v)}
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          name={`supporter-${index}`}
                          id={`supporter-${index}`}
                          type="checkbox"
                          checked={v.supporter}
                          onChange={() => handleCheckboxForSupporter(v)}
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          name={`isOut-${index}`}
                          id={`isOut-${index}`}
                          type="checkbox"
                          checked={v.out}
                          onChange={() => handleCheckboxForOut(v)}
                        />
                      </td>
                      <td className="px-4 py-2">{v.age}</td>
                      <td className="px-4 py-2">{v.phoneNumber}</td>
                      <td className="px-4 py-2">{v.houseNumber}</td>
                      <td className="px-4 py-2">{v.voterId}</td>
                      <td className="px-4 py-2">{v.address}</td>
                      <td className="px-4 py-2">{v.boothAddress}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between mt-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 w-full max-w-[48%]" onClick={handleSurvey}>
                Take Survey
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-gray-400 transition duration-300 w-full max-w-[48%]" onClick={handleClearSearch}>
                Clear Search
              </button>
            </div>
            <div className="mt-4">
              <ShareButton text={voterDetailsForShare} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindVoter;
