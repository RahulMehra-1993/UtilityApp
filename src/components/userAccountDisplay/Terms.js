import classes from "./Terms.module.css";

const Terms = (props) => {
  return (
    <section className={classes.terms}>
      <h1>Terms and Conditions</h1>
      <p>
        This Terms and Conditions Agreement (the "Agreement") governs your use
        of the Utility Tracker App (the "App"). By using the App, you agree to
        be bound by this Agreement.
      </p>
      <h2>Definitions</h2>
      <p>
        <ul>
          <li>
            "App" means the Utility Tracker App, including all software,
            website, and other materials made available by the App.
          </li>
          <li>"User" means any individual or entity that uses the App.</li>
        </ul>
      </p>
      <h2>License</h2>
      <p>
        The App is just for educational purpose only, not to be sold and aimed to be for prodcution. You are granted a non-exclusive,
        non-transferable, revocable license to use the App for your personal,
        non-commercial use. You may not modify, copy, distribute, transmit,
        display, perform, reproduce, publish, license, create derivative works
        from, transfer, or sell any information, software, products, or services
        obtained from the App.
      </p>
      <h2>Privacy Policy</h2>
      <p>
        Your privacy is important to us. Please refer to our Privacy Policy for
        information on how we collect, use, and share your personal information.
      </p>
      <h2>Intellectual Property</h2>
      <p>
        All intellectual property rights in the App, including but not limited
        to copyrights, trademarks, and patents, are owned by or licensed to us.
        You agree not to infringe our intellectual property rights in any way.
      </p>
      <h2>Disclaimer of Warranties</h2>
      <p>
        THE APP IS PROVIDED "AS IS" AND WE MAKE NO WARRANTIES OF ANY KIND,
        EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR
        A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. WE ALSO DO NOT WARRANT THAT
        THE APP WILL BE ERROR-FREE OR THAT ACCESS TO THE APP WILL BE
        UNINTERRUPTED.
      </p>
      <h2>Limitation of Liability</h2>
      <p>
        IN NO EVENT SHALL WE BE LIABLE TO YOU FOR ANY DIRECT, INDIRECT,
        INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT
        NOT LIMITED TO LOST PROFITS, LOST DATA, OR LOSS OF USE, ARISING OUT OF
        OR IN CONNECTION WITH THE APP, WHETHER BASED ON CONTRACT, TORT, STRICT
        LIABILITY, OR OTHERWISE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY
        OF SUCH DAMAGES.
      </p>
      <h2>Miscellaneous</h2>
      <p>
        This Agreement is governed by the laws of the State of California,
        without regard to its conflict of laws provisions. Any dispute arising
        out of or relating to this Agreement shall be resolved exclusively by
        the state or federal courts located in San Francisco, California. If any
        provision of this Agreement is found to be invalid or unenforceable,
        such provision shall be struck from this Agreement and the remaining
        provisions shall remain in full force and effect.
      </p>
      <h2>Changes to the Terms and Conditions</h2>
      <p>
        We may update this Agreement from time to time. The most current version
        of the Agreement will be posted on the App. By continuing to use the App
        after any changes to the Agreement, you agree to be bound by the revised
        Agreement.
      </p>
      <h2>Contact Us</h2>
      <p>
        If you have any questions about this Agreement, please contact us at:
        1993rahulmehra1993@gmail.com
      </p>
      <br />
      <br></br>
      <br></br>
      <h2 className={classes.back} onClick={props.onClick}>
        ← Back
      </h2>
    </section>
  );
};
export default Terms;
