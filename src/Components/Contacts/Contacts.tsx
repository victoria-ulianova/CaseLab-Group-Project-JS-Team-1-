import React, { useState, useEffect } from 'react';
import Map from './Map';
import './Contacts.css';

function Contacts() {
  const [branchesArray, setBranchesArray] = useState<any>(null);

  useEffect(() => {
    async function getBranch() {
      let response = await fetch(
        'https://caselab-group-1.herokuapp.com/getFilials'
      );
      response = await response.json();
      setBranchesArray(response);
    }
    getBranch();
  }, []);

  let branchesList = () => {
    return (
      <div>
        {branchesArray ? ( //@ts-expect-error
          branchesArray.slice(1).map((i) => (
            <div>
              <p>{i.filialTitle}</p>
              <ul>
                <li>Тел: {i.phone}</li>
                <li>Адрес: {i.adress}</li>
              </ul>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    );
  };

  return (
    <div className="Contacts">
      <div className="ContactsWrapper">
        <div className="MainBranch">
          <p>
            Уважаемые гости, вы можете оформить заказ и забрать его по адресу
            ниже:
          </p>
          <p>Шаурма No 1 на Комсомольской:</p>
          <ul>
            <li>Тел.: + 996 705 188 955</li>
            <li>Адрес: Комсомольский проспект, 28</li>
          </ul>
        </div>
        <div className="BranchesList">
          <p>
            Уважаемые гости, скоро мы сможем вас порадовать вкуснейшей шаурмой
            по адресам:
          </p>
          <div>{branchesList()}</div>
        </div>
        <div className="ContactsMail">
          <p>
            Ваши пожелания и предложения пишите сюда:{' '}
            {branchesArray ? branchesArray[0].email : <></>}
          </p>
        </div>
        <div className="ContactsMap">
          <Map />
        </div>
      </div>
    </div>
  );
}

export default Contacts;
