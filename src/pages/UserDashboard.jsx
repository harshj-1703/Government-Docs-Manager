import React, { useState, useEffect } from "react";
import CircularLoading from "../components/CircularLoading";
import documentService from "../services/document.services";
import { Link } from "react-router-dom";
import RenderSmoothImage from "../components/DocumentsComponents/RenderSmoothImage";
import Pagination from "../components/DocumentsComponents/Pagination";

const Skeleton = () => <div className="skeleton-grid"></div>;

function UserDashboard({ isMenuShow }) {
  const [gridData, setGridData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const cardsPerPage = 6;
  const [searchQuery, setSearchQuery] = useState("");
  const [noDataFound, setNoDataFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await documentService.getAllUploadeByUserDocuments(
          currentPage,
          cardsPerPage,
          searchQuery
        );

        if (data.length === 0) {
          setNoDataFound(true);
        } else {
          setNoDataFound(false);
        }

        // const data = [
        //   {
        //     id: "O3QN6DrcOSBQbrCQx1ft",
        //     data: {
        //       createdAt: { seconds: 1706364771, nanoseconds: 530000000 },
        //       fields: { "Aadhar Card": "file", "Bank Details": "image" },
        //       verification: "vote",
        //       banner:
        //         "https://i.pinimg.com/736x/f6/9b/e5/f69be5005ad8bbca51aae4619c16fe33.jpg",
        //       photoExample:
        //         "https://studycafe.in/wp-content/uploads/2022/05/E-SHRAM-CARD.jpg",
        //       ministry: "Ministry of Labour & Employment",
        //       description:
        //         "Pradhan Mantri Shram Yogi Maandhan is a government scheme meant for old age protection and social security of Unorganized workers. Previously this card was known as the Labour Card. This scheme provides an assured Rs. 3000 /- monthly pension to Unorganized workers at the age of 60 years.",
        //       updatedAt: { seconds: 1706364790, nanoseconds: 939000000 },
        //       title: "E-SHRAM YOJNA",
        //       uploadedBy: "Users",
        //       state: "india",
        //     },
        //   },
        //   {
        //     id: "gqmh8nLPH7YBWNz4Pzy9",
        //     data: {
        //       verification: "random",
        //       fields: {
        //         "Certificate saying that your family qualifies for below-the-poverty line":
        //           "file",
        //         "Identification proof": "file",
        //         "Proof of income": "file",
        //         "Address proof": "file",
        //       },
        //       description:
        //         "The policy beneficiaries do not have to pay any enrollment amount/insurance premium to avail of the benefits. It is a 100% government-funded scheme.  The scheme provides up to ₹3 Lakhs to each family annually.  A maximum of five family members can avail of the benefits under the scheme.  ASHA workers are given Rs. 100 for each BPL family they register under this scheme.  The State Government transfers the benefit amount through RTGS.  The policy conducts Mega and General Health Camps (every month) on district levels with the help of government and private hospitals empanelled under the scheme.  The authorities at MA Yojana have dedicated data centres and servers to manage/store information. The IT agency that helps them do so is known as (n)Code Solutions.  All processes under the MA Yojana Scheme are paperless.  The beneficiaries can be enrolled under the scheme throughout the year.  The empanelled hospitals conduct Mega Health Camps and General Health Camps.  Beneficiaries can be enrolled at the Civic Centre Kiosks and Taluka Kiosks.  There is no mediator involved in the entire process.The policy provides ₹3 Lakhs per year per family as medical coverage.  The scheme provides benefits up to ₹5 Lakhs for Kidney Transplant, Liver Transplant, and Kidney + Pancreas Transplant procedures.   It also provides cover for Cardiovascular diseases, Renal diseases, Neurological diseases, Burns, Polytrauma, Cancer, Neonatal diseases, Knee & Hip Replacement, Liver and Kidney + Pancreas Transplant and 600+ other procedures.  Each beneficiary is issued a QR-coded card that contains biometric thumb impressions, photos, a unique registration number (URN), and district and taluka name.  The policy also offers cover for travel charges of up to ₹300 per hospitalisation.  The policy covers the cost of repatriation of remains at ₹6 per km from the hospital to the beneficiary’s house.  The policy provides all the benefits under the PMJAY Scheme.",
        //       banner:
        //         "https://www.paybima.com/blog/wp-content/uploads/2022/12/Mukhyamantri-Amrutum-Yojana-Eligibility-Coverage-and-Benefits.jpg",
        //       uploadedBy: "Users",
        //       ministry: "National Health Ministry",
        //       state: "Gujarat",
        //       updatedAt: { seconds: 1706364851, nanoseconds: 302000000 },
        //       createdAt: { seconds: 1706364750, nanoseconds: 207000000 },
        //       title: "MAA CARD YOJNA",
        //       photoExample:
        //         "https://images.bhaskarassets.com/web2images/960/2021/08/06/new-project-22_1628233965.jpg",
        //     },
        //   },
        //   {
        //     id: "VEvjqZsRidrzLZslkrlq",
        //     data: {
        //       title: "PM VISWAKARMA YOJNA",
        //       description:
        //         "PM Modi launched the PM Vishwakarma Yojana on their 73rd birthday. He implements this yojana in honour of Vishwakarma Jayanti. It gives cash support to small employees and skilled craftspeople along with training, advice on skill matters, and knowledge of modern techniques.",
        //       state: "india",
        //       updatedAt: { seconds: 1706364833, nanoseconds: 379000000 },
        //       uploadedBy: "Users",
        //       banner:
        //         "https://img.hi.91mobiles.com/uploads/2023/09/PM-Vishwakarma-Yojana-2023-3.jpg",
        //       fields: {
        //         "Account Number": "number",
        //         "Residential Certificate": "file",
        //         "Aadhar Card": "file",
        //         "Certificates of Skill": "file",
        //         "Bank Passbook": "file",
        //         "Ration Card": "file",
        //       },
        //       createdAt: { seconds: 1706364817, nanoseconds: 219000000 },
        //       verification: "random",
        //       photoExample:
        //         "https://biharhelp.in/wp-content/uploads/2023/09/5036-min.png",
        //       ministry: "Ministry of Micro, Small and Medium Enterprises",
        //     },
        //   },
        // ];
        // console.log(data);
        setGridData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    let timeForSearch;

    if (currentPage !== 1 || searchQuery !== "") {
      timeForSearch = setTimeout(() => {
        fetchData();
      }, 300);
    } else {
      fetchData();
    }

    return () => {
      clearTimeout(timeForSearch);
    };
  }, [currentPage, searchQuery]);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = gridData.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(gridData.length / cardsPerPage);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="user-dashboard">
      <div
        className={
          isMenuShow
            ? "user-dashboard-main-content-blur"
            : "user-dashboard-main-content"
        }
      >
        <div className="search-and-grid-main-div">
          <div className="search-div">
            <div className="inputs">
              <input
                type="text"
                name="search-doc"
                className="search-doc"
                placeholder="Search Document"
                required=" "
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <div className="grid-container">
            {!isLoading ? (
              currentCards.length > 0 ? (
                currentCards.map((item) => (
                  <div key={item.id} className="card">
                    <Link to={`/user-dashboard/docdetails/`} state={item.id}>
                      <RenderSmoothImage
                        src={item.data.banner}
                        Skeleton={Skeleton}
                      />
                      <div className="card__content">
                        <p className="card__title">{item.data.title}</p>
                        <p
                          className="card__description"
                          dangerouslySetInnerHTML={{
                            __html: item.data.description,
                          }}
                        ></p>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <div id="error-page-div" style={{ textAlign: "center" }}>
                  <h1>No Data Found</h1>
                </div>
              )
            ) : (
              <CircularLoading />
            )}
          </div>
        </div>
      </div>
      {/* Pagination */}
      <Pagination
        isLoading={isLoading}
        currentCards={currentCards}
        isMenuShow={isMenuShow}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
}

export default UserDashboard;
